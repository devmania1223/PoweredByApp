import { schemaComposer } from 'graphql-compose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import Stripe from 'stripe';
import { liiingo } from '../../';
import { Organization } from '../../data/types';
import { createStripeSubscription } from '../../services/stripe';
import { logger } from '../../util/logger';
import { EssentialTemplate, EssentialTemplateModel } from '../essentialTemplates/model';
import { EssentialTemplateTC } from '../essentialTemplates/typedefs';
import { createOrganization, OrganizationModel, OrganizationTC } from '../organizations/model';
import { AppOnboardingFlow, AppOnboardingFlowModel } from './model';

//need to require this code so it executes
require('../essentialTemplates/typedefs');

const AppOnboardingFlowTC = composeWithMongoose(AppOnboardingFlow);

AppOnboardingFlowTC.addRelation<EssentialTemplateModel>('essentialTemplate', {
  resolver: EssentialTemplateTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.templateId,
  },
  projection: {
    templateId: true,
  },
});

AppOnboardingFlowTC.removeField('templateId');

AppOnboardingFlowTC.addRelation<Organization>('organization', {
  resolver: OrganizationTC.getResolver('findById'),
  prepareArgs: {
    _id: (source) => source.organizationId,
  },
  projection: {
    organizationId: true,
  },
});
AppOnboardingFlowTC.removeField('organizationId');

const createTemplatedAppOnboardingFlowMutationArgsSchema = {
  organizationName: 'String!',
  organizationEmail: 'String!',
  organizationLogo: 'String',
  organizationFavicon: 'String',
  onboardingRoute: 'String!',
  onboardingTemplate: 'EssentialTemplateInput!',
  createNewOrganization: 'Boolean',
};

const CreateTemplatedAppOnboardingFlowMutationResponse = schemaComposer.createObjectTC({
  name: 'CreateTemplatedAppOnboardingFlowMutationResponse',
  fields: {
    appOnboardingFlow: 'AppOnboardingFlow',
  },
});
AppOnboardingFlowTC.addResolver({
  kind: 'mutation',
  name: 'createTemplatedAppOnboardingFlow',
  args: createTemplatedAppOnboardingFlowMutationArgsSchema,
  type: CreateTemplatedAppOnboardingFlowMutationResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }: { args: MutationCreateTemplatedAppOnboardingFlowArgs }) => {
    const template = new EssentialTemplate();
    template.name = args.onboardingTemplate.name;
    template.stripeProductCode = args.onboardingTemplate.stripeProductCode;
    template.templateId = args.onboardingTemplate.templateId;
    await template.save();

    let organization: OrganizationModel;
    try {
      // A Stripe CustomerID is generated while creating the organization.
      organization = await createOrganization({
        name: args.organizationName,
        email: args.organizationEmail,
        type: 'subscriber', // making organization a subscriber for the new template flow
      });
      await organization.save();
      logger.info(`Created Organization: ${JSON.stringify(organization)}`);
    } catch (error) {
      // Roll back everything that was created so far
      logger.error(
        `Error creating a new Liiingo organization as part of a new AppOnboardingTemplate (maybe the Organization name or email isn't unique?). Rolling back partial data: AppOnboardingTemplate ID: ${template._id}. Original Error: ${error}`
      );
      template.delete();
      throw new Error(
        `Error creating a new Liiingo organization as part of a new AppOnboardingTemplate (maybe the Organization name or email isn't unique?)`
      );
    }

    try {
      // Now create an App that will contain the templated content for all other Apps in this org

      const liiingoLocation = await liiingo.createApp({
        organizationId: organization.liiingoOrganizationId,
        name: 'The Template',
        companyName: args.organizationName,
        supportedLanguages: ['en'], // TODO: This should be selectable during registration
        defaultLanguage: 'en', // TODO: This should be selectable during registration
        phoneNumber: '',
        contactName: args.organizationName,
        email: args.organizationEmail,
        status: 1,
      });

      // This allows all other apps created under this org to inherit content from the app we just created
      organization.parentMenuId = liiingoLocation?.menuId ?? '';
      await liiingo.updateOrganization({
        id: organization.liiingoOrganizationId,
        name: organization.name,
        email: organization.email,
        type: organization.type,
        parentMenuId: organization.parentMenuId,
      });
      await organization.save();
    } catch (error) {
      // Roll back everything that was created so far
      logger.error(
        `Error creating a new App to hold the templated content. Rolling back partial data:  AppOnboardingTemplate ID: ${template._id}, Organization ID: ${organization._id}`
      );
      template.delete();
      liiingo.deleteOrganization(organization.liiingoOrganizationId);
      organization.delete();
    }

    let onboardingFlow: AppOnboardingFlowModel;
    try {
      const subscription: Stripe.Subscription = await createStripeSubscription(
        organization.stripeCustomerId,
        template.stripeProductCode,
        0
      );

      onboardingFlow = new AppOnboardingFlow({
        route: args.onboardingRoute,
        templateId: template._id,
        organizationId: organization._id,
        stripeSubscriptionId: subscription.id,
        logo: args.organizationLogo,
        favicon: args.organizationFavicon,
        createNewOrganization: args.createNewOrganization,
      });
      await onboardingFlow.save();
    } catch (error) {
      // Roll back everything that was created so far
      logger.error(
        `Error creating a new AppOnboardingFlow object. Rolling back partial data: AppOnboardingTemplate ID: ${template._id}, Organization ID: ${organization._id}`
      );
      template.delete();
      liiingo.deleteOrganization(organization.liiingoOrganizationId);
      organization.delete();

      // Let the original error bubble up
      throw error;
    }

    return {
      appOnboardingFlow: onboardingFlow,
    };
  },
});

const createTemplatedOrgOnboardingFlowMutationArgsSchema = {
  onboardingRoute: 'String!',
  onboardingTemplate: 'EssentialTemplateInput!',
};
const CreateTemplatedOrgOnboardingFlowMutationResponse = schemaComposer.createObjectTC({
  name: 'CreateTemplatedOrgOnboardingFlowMutationResponse',
  fields: {
    orgOnboardingFlow: 'AppOnboardingFlow',
  },
});
AppOnboardingFlowTC.addResolver({
  kind: 'mutation',
  name: 'createTemplatedOrgOnboardingFlow',
  args: createTemplatedOrgOnboardingFlowMutationArgsSchema,
  type: CreateTemplatedOrgOnboardingFlowMutationResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }: { args: MutationCreateTemplatedOrgOnboardingFlowArgs }) => {
    const template = new EssentialTemplate();
    template.name = args.onboardingTemplate.name;
    template.stripeProductCode = args.onboardingTemplate.stripeProductCode;
    template.templateId = args.onboardingTemplate.templateId;
    await template.save();

    let onboardingFlow: AppOnboardingFlowModel;

    try {
      onboardingFlow = new AppOnboardingFlow({
        route: args.onboardingRoute,
        templateId: template._id,
        createNewOrganization: true,
      });
      await onboardingFlow.save();
    } catch (error) {
      // Roll back everything that was created so far
      logger.error(
        `Error creating a new AppOnboardingFlow object. Rolling back partial data: AppOnboardingTemplate ID: ${template._id}`
      );
      template.delete();

      // Let the original error bubble up
      throw error;
    }

    return {
      orgOnboardingFlow: onboardingFlow,
    };
  },
});

export { AppOnboardingFlowTC };
