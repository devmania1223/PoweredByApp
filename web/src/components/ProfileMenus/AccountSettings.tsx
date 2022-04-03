import { ApolloError, useLazyQuery, useMutation } from '@apollo/client';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { useContext, useEffect, useState } from 'react';
import { ErrorContext } from '../../context/ErrorContext';
import { OnboardingFlowContext } from '../../context/OnboardingFlowContext';
import { useLogout } from '../../hooks/useLogout';
import { CLOSE_ACCOUNT_MUTATION, GET_PLAN_BY_ID_QUERY, GET_PLAN_FOR_USER_QUERY } from '../../services/schema';
import { closeAccount } from '../../types/closeAccount';
import { FlatButton } from '../Buttons';
import { UserAccountForm } from '../UserAccountForm';
import { useStripe } from '@stripe/react-stripe-js';
import { CREATE_CHECKOUT_SESSION_MUTATION } from '../../services/schema';
import { createCheckoutSession } from '../../types/createCheckoutSession';
import { useQueryStringParams } from '../../hooks/useQueryStringParams';
import { UpgradeAccountUI } from './UpgradeAccountUI';
import { BillingInformationCard } from './BillingInformationCard';
import { AccountSecurityCard } from './AccountSecurityCard';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { colors } from '../../theme/palette';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { AppContext } from '../../context/AppContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    containerWidth: {
      width: '100%',
    },
    dashboardTitle: {
      padding: 8,
    },
    closeBtn: {
      borderRadius: 10,
      color: colors.redDark,
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), #DC4C4C',

      '&:hover': {
        borderRadius: 10,
        color: colors.pureWhite,
        background: colors.redDark,
      },
    },
    btnRow: {
      padding: 20,
    },
  })
);

export const AccountSettings = () => {
  const { handleError } = useContext(ErrorContext);
  const { route } = useContext(OnboardingFlowContext);
  const { identity } = useContext(AppContext);
  const [planId, setPlanId] = useState('');
  const [billing, setBilling] = useState('');
  const [productCode, setProductCode] = useState('');
  const [closeAccountDialogOpen, setCloseAccountDialogOpen] = useState(false);
  const logout = useLogout();
  const stripe = useStripe();
  const onboardingFlowContext = useContext(OnboardingFlowContext);
  const onError = (error: string | ApolloError) => {};
  const params = useQueryStringParams();
  const classes = useStyles();

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

  const [createCheckout] = useMutation<createCheckoutSession>(CREATE_CHECKOUT_SESSION_MUTATION, {
    onCompleted: (data) => {
      beginStripeCheckout(data);
    },
    onError: onError,
  });

  const handleAddBill = () => {
    createCheckout({
      variables: {
        productCode,
        route: route,
        successUrl: `${process.env.REACT_APP_CLIENT_URL}/${onboardingFlowContext.route}/payment-confirmation?sessionId={CHECKOUT_SESSION_ID}&ftu=false&isUpgrade=true`,
        cancelUrl: `${process.env.REACT_APP_CLIENT_URL}/${onboardingFlowContext.route}/profile/billing`,
      },
    });
  };

  const handleCancel = () => {
    setCloseAccountDialogOpen(false);
  };

  const handleConfirm = () => {
    closeAccountMutation({
      variables: {
        route,
      },
    });
  };

  const onCloseAccountSuccess = () => {
    logout();
  };

  const [closeAccountMutation] = useMutation<closeAccount>(CLOSE_ACCOUNT_MUTATION, {
    onCompleted: (data) => {
      onCloseAccountSuccess();
    },
    onError: handleError,
  });

  const [getPlanById] = useLazyQuery(GET_PLAN_BY_ID_QUERY, {
    variables: {
      id: planId,
    },
    onCompleted: (data) => {
      setProductCode(billing === 'annual' ? data.planById.annualStripeId : data.planById.monthlyStripeId);
    },
  });

  const [userPlan] = useLazyQuery(GET_PLAN_FOR_USER_QUERY, {
    variables: {
      sub: identity?.id,
    },
    onCompleted: (data) => {
      if (data.user.planId) {
        setPlanId(data.user.planId);
        setBilling(data.user.billing);
        getPlanById();
      } else {
        setProductCode(onboardingFlowContext.essentialTemplate.stripeProductCode);
      }
    },
  });

  useEffect(() => {
    if (identity?.id) {
      userPlan();
    }
  }, [identity?.id, userPlan]);

  return (
    <Container className={classes.containerWidth}>
      <Dialog open={closeAccountDialogOpen} maxWidth="sm">
        <DialogTitle>Close Your Account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By closing your account, all published apps will be deleted permanently once the remaining billing cycle has
            ended. Are you sure you want to close your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.btnRow}>
          <FlatButton onClick={handleCancel} color="primary">
            Keep My Account
          </FlatButton>
          <FlatButton
            onClick={handleConfirm}
            color="primary"
            className={classes.closeBtn}
            autoFocus
            data-cy={'confirmCloseAccount'}
          >
            Close My Account
          </FlatButton>
        </DialogActions>
      </Dialog>
      <Typography variant="h5" className={classes.dashboardTitle}>
        Account Settings
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UpgradeAccountUI isVisible={params.get('isUpgrade')} />
        </Grid>
        <Grid item xs={6}>
          <UserAccountForm onError={handleError} submitButtonText="Update" />
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={12}>
            <BillingInformationCard onHandleAddBill={handleAddBill} isUpgrade={params.get('isUpgrade')} />
          </Grid>
          <Grid item xs={12}>
            <AccountSecurityCard onCloseAccountDialogOpen={setCloseAccountDialogOpen} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
