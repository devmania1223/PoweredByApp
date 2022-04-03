import { useStripe } from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const RedirectToStripeCheckout = () => {
  const { stripeSessionId } = useParams<{ stripeSessionId: string }>();
  const stripe = useStripe();

  useEffect(() => {
    if (stripe) {
      stripe.redirectToCheckout({
        sessionId: stripeSessionId,
      });
    }
  }, [stripe, stripeSessionId]);

  return null;
};
