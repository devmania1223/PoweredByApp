import { UserInputError } from 'apollo-server-errors';
import { schemaComposer } from 'graphql-compose';
import humps from 'humps';
import Stripe from 'stripe';
import { config } from '../../config';
import { authMiddleware } from '../../middleware/auth';
import {
  createBillingPortalSession,
  createStripeSession,
  endStripeSubscription,
  getCustomerPaymentMethod,
  getSubscriptionForCustomer,
  verifySession,
} from '../../services/stripe';
import { logger } from '../../util/logger';
import { AppOnboardingFlow } from '../appOnboardingFlows/model';
import { EssentialTemplate } from '../essentialTemplates/model';
import { Organization, OrganizationModel } from '../organizations/model';
import { User, UserModel } from '../users/model';

const BillingPortalResponse = schemaComposer.createObjectTC({
  name: 'BillingPortalResponse',
  fields: {
    url: 'String!',
  },
});
const createBillingSessionMutationArgs = {
  _id: 'String!',
  returnUrl: 'String',
};
type CreateBillingSessionMutationArgs = {
  _id: string;
  returnUrl: string;
};

const createBillingSessionMutation = schemaComposer.createResolver<null, CreateBillingSessionMutationArgs>({
  kind: 'mutation',
  name: 'createBillingSession',
  args: createBillingSessionMutationArgs,
  type: BillingPortalResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }) => {
    const organization = await Organization.findById(args._id);
    if (!organization) {
      throw new Error(`No organization found with ID ${args._id}`);
    }

    const session: Stripe.BillingPortal.Session = await createBillingPortalSession(
      organization.stripeCustomerId,
      args.returnUrl ? `${config.CLIENT_URL}${args.returnUrl}` : `${config.CLIENT_URL}/profile/billing`
    );

    return {
      url: session.url,
    };
  },
});

const CreateCheckoutSessionResponse = schemaComposer.createObjectTC({
  name: 'CreateCheckoutSessionResponse',
  fields: {
    sessionId: 'String!',
  },
});

const createCheckoutSessionArgs = {
  route: 'String!',
  productCode: 'String',
  successUrl: 'String!',
  cancelUrl: 'String!',
};
type CreateCheckoutSessionArgs = { route: string; productCode?: string; successUrl: string; cancelUrl: string };
const createCheckoutSessionMutation = schemaComposer.createResolver<null, CreateCheckoutSessionArgs>({
  kind: 'mutation',
  name: 'createCheckoutSession',
  args: createCheckoutSessionArgs,
  type: CreateCheckoutSessionResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }) => {
    const callingUser = context.user!; // The user MUST be populated by the auth middleware
    const userModel: UserModel | null = await User.findOne({ sub: callingUser.sub });
    if (!userModel) {
      throw new Error(`Couldn't find user record for user: ${callingUser.email}`);
    }
    const organization: OrganizationModel | null = await Organization.findById(userModel.organizationId);
    if (!organization) {
      throw new Error(`Couldn't find organization for user: ${callingUser.email}`);
    }
    const onboardingTemplateId = (await AppOnboardingFlow.findOne({ route: args.route }))?.templateId;
    const onboardingTemplate = await EssentialTemplate.findById(onboardingTemplateId);
    if (!onboardingTemplate) {
      throw new UserInputError(
        `Couldn't complete user registration because the onboarding route (${args.route}) isn't active.`
      );
    }
    context.logger.info(`creating stripe checkout session for user: ${callingUser.email}`);

    const stripeProductCode = args?.productCode ?? onboardingTemplate.stripeProductCode;

    const session = await createStripeSession(
      organization.stripeCustomerId,
      stripeProductCode,
      args.successUrl,
      args.cancelUrl
    );

    return {
      sessionId: session?.id,
    };
  },
});

const VerifyPaymentResponse = schemaComposer.createObjectTC({
  name: 'VerifyPaymentResponse',
  fields: {
    verified: 'Boolean!',
    _id: 'String!',
  },
});

const verifyPaymentMutationArgs = {
  checkoutSessionId: 'String!',
  isUpgrade: 'Boolean!',
};
type VerifyPaymentMutationArgs = {
  checkoutSessionId: string;
  isUpgrade: boolean;
};

const verifyPaymentMutation = schemaComposer.createResolver<null, VerifyPaymentMutationArgs>({
  kind: 'mutation',
  name: 'verifyPayment',
  args: verifyPaymentMutationArgs,
  type: VerifyPaymentResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }: ResolverResolveParams<void, AppContext>) => {
    const callingUser = context.user!; // The user MUST be populated by the auth middleware
    const userModel: UserModel | null = await User.findOne({ sub: callingUser.sub });
    if (!userModel) {
      throw new Error(`Couldn't find user record for user: ${callingUser.email}`);
    }
    const organization: OrganizationModel | null = await Organization.findById(userModel.organizationId);
    if (!organization) {
      throw new Error(`Couldn't find organization for user: ${callingUser.email}`);
    }
    if (args.isUpgrade) {
      logger.info(
        `ending old Stripe subscription for organization ${args._id} because upgraded subscription is being created`
      );
      await endStripeSubscription(organization.stripeCustomerId);
    }
    const session = await verifySession(args.checkoutSessionId);

    return {
      verified: session?.customer === organization.stripeCustomerId,
    };
  },
});

const getSubscriptionResponse = schemaComposer.createObjectTC({
  name: 'getSubscriptionResponse',
  fields: {
    id: 'String!',
    trialEnd: 'String',
    trialStart: 'String',
    status: 'String',
    startDate: 'Int',
    daysUntilDue: 'Int',
  },
});

const getSubscriptionQuery = schemaComposer.createResolver<null, CreateBillingSessionMutationArgs>({
  kind: 'query',
  name: 'subscription',
  type: getSubscriptionResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }) => {
    const callingUser = context.user!; // The user MUST be populated by the auth middleware
    const userModel: UserModel | null = await User.findOne({ sub: callingUser.sub });
    if (!userModel) {
      throw new Error(`Couldn't find user record for user: ${callingUser.email}`);
    }
    const organization: OrganizationModel | null = await Organization.findById(userModel.organizationId);
    if (!organization) {
      throw new Error(`Couldn't find organization for user: ${callingUser.email}`);
    }
    return humps.camelizeKeys(await getSubscriptionForCustomer(organization.stripeCustomerId));
  },
});

const CardChecks = schemaComposer.createObjectTC({
  name: 'CardChecks',
  fields: {
    cvcCheck: 'String',
  },
});

const CardResponse = schemaComposer.createObjectTC({
  name: 'CardResponse',
  fields: {
    brand: 'String',
    checks: CardChecks,
  },
});

const CustomerPaymentMethodResponse = schemaComposer.createObjectTC({
  name: 'CustomerPaymentMethodResponse',
  fields: {
    id: 'String!',
    object: 'String',
    card: CardResponse,
  },
});

const CustomerPaymentMethodQuery = schemaComposer.createResolver<null, {}>({
  kind: 'query',
  name: 'customerPaymentMethod',
  type: CustomerPaymentMethodResponse,

  resolve: async ({ args, context }) => {
    const callingUser = context.user!; // The user MUST be populated by the auth middleware
    const userModel: UserModel | null = await User.findOne({ sub: callingUser.sub });
    if (!userModel) {
      throw new Error(`Couldn't find user record for user: ${callingUser.email}`);
    }
    const organization: OrganizationModel | null = await Organization.findById(userModel.organizationId);
    if (!organization) {
      throw new Error(`Couldn't find organization for user: ${callingUser.email}`);
    }
    return humps.camelizeKeys(await getCustomerPaymentMethod(organization.stripeCustomerId));
  },
});

export const BillingQueries = {
  subscription: getSubscriptionQuery.withMiddlewares([authMiddleware]),
  customerPaymentMethod: CustomerPaymentMethodQuery.withMiddlewares([authMiddleware]),
};

export const BillingMutations = {
  createBillingSession: createBillingSessionMutation.withMiddlewares([authMiddleware]),
  createCheckoutSession: createCheckoutSessionMutation.withMiddlewares([authMiddleware]),
  verifyPayment: verifyPaymentMutation.withMiddlewares([authMiddleware]),
};
