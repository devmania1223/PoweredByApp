import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { useStripe } from '@stripe/react-stripe-js';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { useContext, useState } from 'react';
import { OnboardingFlowContext } from '../../context/OnboardingFlowContext';
import { CREATE_CHECKOUT_SESSION_MUTATION, SUBSCRIPTION_QUERY } from '../../services/schema';
import { createCheckoutSession } from '../../types/createCheckoutSession';
import { IS_CLOSED, IS_CLOSED_UPGRADED } from '../../util/constants';
import { TrialDaysUI } from './TrialDaysUI';

const showExpandedView = (isExpanded, isUpgraded, daysRemaining) => {
  if (isExpanded) {
    return true;
  }
  if (isUpgraded) {
    return !localStorage.getItem(IS_CLOSED_UPGRADED);
  } else {
    if (daysRemaining > 3) {
      return false;
    }
    const closedToday = String(new Date().getUTCDate()) === localStorage.getItem(IS_CLOSED);
    return !closedToday;
  }
};

export type TrialDaysWidgetProps = {
  isVisible?: boolean;
  onError?: (error: string | ApolloError) => void;
  position?: SnackbarOrigin;
  cancelLocation?: string;
};

const defaultProps: Partial<TrialDaysWidgetProps> = {
  isVisible: true,
  onError: () => {},
  position: { vertical: 'bottom', horizontal: 'right' },
  cancelLocation: 'profile/engagement',
};

const TrialDaysWidget = (props: TrialDaysWidgetProps) => {
  const { isVisible, position, cancelLocation, onError } = {
    ...defaultProps,
    ...props,
  };
  const stripe = useStripe();
  const [expanded, setExpanded] = useState(false);
  const [upgraded, setUpgraded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number>();
  const onboardingFlowContext = useContext(OnboardingFlowContext);

  const { loading } = useQuery(SUBSCRIPTION_QUERY, {
    onCompleted: (data) => {
      if (!data.subscription) {
        setVisible(false);
      } else {
        const trialEndMs = Number(data.subscription.trialEnd) * 1000;
        const isUpgraded = !!data.customerPaymentMethod;
        const differenceInDays = differenceInCalendarDays(trialEndMs, Math.floor(Date.now()));
        setUpgraded(isUpgraded);
        setVisible(differenceInDays < 0 ? false : isVisible);
        setDaysRemaining(differenceInDays);
        setExpanded(showExpandedView(expanded, isUpgraded, differenceInDays));
      }
    },
  });

  const beginStripeCheckout = (data: createCheckoutSession) => {
    if (!data?.createCheckoutSession) {
      onError('Something went wrong, please try again shortly');
      return;
    }
    const { sessionId } = data.createCheckoutSession;
    // Open Stripe checkout in current window
    stripe?.redirectToCheckout({
      sessionId,
    });
  };

  const createCheckoutSession = useMutation<createCheckoutSession>(CREATE_CHECKOUT_SESSION_MUTATION, {
    onCompleted: (data) => {
      beginStripeCheckout(data);
    },
    onError: onError,
    variables: {
      route: onboardingFlowContext.route,
      successUrl: `${process.env.REACT_APP_CLIENT_URL}/${onboardingFlowContext.route}/payment-confirmation?sessionId={CHECKOUT_SESSION_ID}&ftu=false&isUpgrade=true`,
      cancelUrl: `${process.env.REACT_APP_CLIENT_URL}/${onboardingFlowContext.route}/${cancelLocation}`,
    },
  });

  if (!visible) {
    return null;
  }

  if (loading) {
    return null;
  }

  return (
    <TrialDaysUI
      isExpanded={expanded}
      isUpgraded={upgraded}
      days={daysRemaining}
      position={position}
      createStripeCheckoutSession={createCheckoutSession}
      onError={onError}
    />
  );
};

export default TrialDaysWidget;
