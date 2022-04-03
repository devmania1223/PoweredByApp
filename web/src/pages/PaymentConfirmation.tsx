import { useMutation } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Throbber } from '../components';
import { ErrorContext } from '../context/ErrorContext';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';
import { useQueryStringParams } from '../hooks/useQueryStringParams';
import { VERIFY_PAYMENT_MUTATION } from '../services/schema';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { AppContext } from '../context/AppContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: theme.spacing(1), // Don't let content overlap the floating logo button
    },
    card: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(16),
    },
    spinner: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  })
);

const PaymentConfirmation = () => {
  const sendDataToGTM = useGTMDispatch();
  const params = useQueryStringParams();
  const classes = useStyles();
  const onboardingFlowContext = useContext(OnboardingFlowContext);
  const sessionId = params.get('sessionId');
  const { handleError } = useContext(ErrorContext);
  const [mutationInProgress, setMutationInProgress] = useState(true);
  const { identity } = useContext(AppContext);
  const onCompleted = async () => {
    sendDataToGTM({ event: 'payment_received', username: identity.username, route: onboardingFlowContext.route });
    setMutationInProgress(false);
  };

  const [verifyPaymentMutation, { called }] = useMutation(VERIFY_PAYMENT_MUTATION, {
    onCompleted,
    onError: handleError,
  });

  useEffect(() => {
    if (!called) {
      verifyPaymentMutation({
        variables: {
          checkoutSessionId: sessionId,
          isUpgrade: params.get('isUpgrade') === 'true',
        },
      });
    }
  }, [called, params, sessionId, verifyPaymentMutation]);

  if (mutationInProgress) {
    return (
      <Container className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.spinner}>
            <Throbber />
            <Typography variant="h2" align="center" paragraph>
              Please wait, we're verifying your payment
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }
  return <Redirect to={`/${onboardingFlowContext.route}/profile/Billing?&isUpgrade=${params.get('isUpgrade')}`} />;
};

export default PaymentConfirmation;
