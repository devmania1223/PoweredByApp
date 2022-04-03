import Stripe from 'stripe';
import { liiingo } from '../';
import { config } from '../config';
import { AppOnboardingFlow } from '../features/appOnboardingFlows/model';
import { AppOnboardingTemplate } from '../features/appOnboardingTemplates/model';
import { Organization } from '../features/organizations/model';
import { logger } from '../util/logger';
import { sendTrialAboutToExpireEmail } from './mail';

const stripe = new Stripe(config.STRIPE_PRIVATE_KEY as string, {
  apiVersion: '2020-08-27',
});

export const createCustomer = async (
  params?: Stripe.CustomerCreateParams,
  options?: Stripe.RequestOptions
): Promise<Stripe.Customer> => {
  const response: Promise<Stripe.Customer> = stripe.customers.create(params, options);
  return response;
};

export const createStripeSubscription = async (
  customerId: string,
  priceId: string,
  quantity: number = 1,
  trialDays?: number
): Promise<Stripe.Subscription> => {
  return await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId, quantity }],
    trial_period_days: trialDays,
  });
};

export const getSubscriptionForCustomer = async (customerId: string): Promise<Stripe.Subscription> => {
  const subscriptionsList = await stripe.subscriptions.list({ customer: customerId });
  return subscriptionsList?.data[0];
};

export const getCustomerPaymentMethod = async (customerId: string): Promise<Stripe.PaymentMethod> => {
  const paymentMethods = await stripe.paymentMethods.list({ customer: customerId, type: 'card' });
  return paymentMethods?.data[0];
};

export const createStripeSession = async (
  customer: string,
  productId: string,
  successUrl: string,
  cancelUrl: string,
  quantity = 1,
  mode: 'subscription' | 'payment' | 'setup' = 'subscription'
): Promise<Stripe.Checkout.Session> => {
  const session = stripe.checkout.sessions.create({
    mode,
    customer,
    payment_method_types: ['card'],
    line_items: [
      {
        price: productId,
        quantity,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  });

  return session;
};

export const createBillingPortalSession = async (
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session;
};

export const verifySession = async (checkoutSessionId: string): Promise<Stripe.Checkout.Session | null> => {
  const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
  if (!session) {
    throw new Error('unknown stripe session id found');
  }
  return session;
};

export const endStripeSubscription = async (customerId: string): Promise<Stripe.Subscription | null> => {
  logger.info(`cancelling subscription for customer: ${customerId}`);
  let subscriptionsList = await stripe.subscriptions.list({ customer: customerId });
  let id = subscriptionsList?.data[0]?.id;
  const subscription = !id ? null : await stripe.subscriptions.del(id); // .del throws if passed a nullish id
  return subscription;
};

export const handleWebhook = async (event: Stripe.Event): Promise<Boolean> => {
  let organization;
  const subscription = event.data.object as Stripe.Subscription;
  logger.info(`received stripe webhook: ${event.type}`);
  switch (event.type) {
    case 'customer.subscription.deleted':
      logger.info(`handling customer subscription delete event for ${subscription.customer}`);
      organization = await Organization.findOne({ stripeCustomerId: subscription.customer as string });
      if (!organization) {
        logger.error(`couldn't find an Organization for Stripe Customer ${subscription.customer}`);
        return false;
      }
      organization.active = false;

      logger.info(`deleting Liiingo Organization: ${organization.liiingoOrganizationId}`);
      await liiingo.deleteOrganization(organization.liiingoOrganizationId);
      await organization.save();
      break;
    case 'customer.subscription.updated':
      logger.info(`handling customer subscription update event for ${subscription.customer}`);
      if (['past_due', 'canceled', 'unpaid'].includes(subscription.status)) {
        logger.info(
          `deactivating ${subscription.customer} because their stripe subscription status was ${subscription.status}`
        );
        organization = await Organization.findOne({ stripeCustomerId: subscription.customer as string });
        if (!organization) {
          logger.error(`couldn't find an Organization for Stripe Customer ${subscription.customer}`);
          return false;
        }
        organization.active = false;

        logger.info(`deleting Liiingo Organization: ${organization.liiingoOrganizationId}`);
        await liiingo.deleteOrganization(organization.liiingoOrganizationId);
        await organization.save();
        break;
      } else {
        logger.info(`The customer subscription status is now ${subscription.status}, which is a no-op`);
      }
      break;
    case 'customer.subscription.trial_will_end': //sent 3 days before a trial will end
      const stripePriceCode = subscription.items?.data[0]?.price?.id; // TODO: At some point, we may have subscriptions with more than 1 item in them and this assumption will fail
      if (!stripePriceCode) {
        logger.error(`no stripe price id provided with the subscription items: ${JSON.stringify(subscription.items)}`);
      }

      logger.info(`handling customer subscription trial ending event for ${subscription.customer}`);
      organization = await Organization.findOne({ stripeCustomerId: subscription.customer as string });
      if (!organization) {
        logger.error(`no Organization found for stripeCustomerId: ${subscription.customer}`);
        return false;
      }

      const template = await AppOnboardingTemplate.findOne({ stripeProductCode: stripePriceCode });
      if (!template) {
        logger.error(
          `Failed to get AppOnboardingTemplate for customer: ${
            subscription.customer
          } during 'trial_will_end' hook. subscription: ${JSON.stringify(subscription)}`
        );
        return false;
      }

      const flow = await AppOnboardingFlow.findOne({ templateId: template?.id });

      if (!flow) {
        logger.error(
          `Failed to get AppOnboardingFlow for ${
            subscription.customer
          } during 'trial_will_end' hook. subscription: ${JSON.stringify(template)}`
        );
        return false;
      }
      const route = flow?.route;
      const liiingoUrl = `${config.CLIENT_URL}/${route}/profile/organization`;

      const stripeCheckOutUrl = liiingoUrl; // <-- sending them to a liiingo page for now...
      sendTrialAboutToExpireEmail(organization.email, stripeCheckOutUrl);
      break;
  }
  return false;
};

export const changeSubscriptionQuantity = async (
  stripeSubscriptionId: string,
  quantity: number,
  email: string
): Promise<void> => {
  const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
  logger.info(`Stripe subscription id(${subscription.id}) is changing quantity by ${quantity} seats`);
  const subscriptionItem: Stripe.SubscriptionItem = subscription?.items?.data[0];
  logger.info(JSON.stringify(subscriptionItem));

  if (subscriptionItem) {
    try {
      await stripe.subscriptionItems.update(subscriptionItem.id, {
        metadata: { [email]: quantity },
        quantity: (subscriptionItem.quantity || 0) + quantity,
      });
    } catch (error) {
      logger.error(
        `Error while updating a Stripe subscription quantity: ${error}. (The subscription may have been canceled).`
      );
    }
  } else {
    logger.error('Could not find stripe subscription item to increment for a new sign-up');
  }
};
