import { useLazyQuery, useMutation } from '@apollo/client';
import Bugsnag from '@bugsnag/js';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Throbber } from '..';
import { AppContext } from '../../context/AppContext';
import { ErrorContext } from '../../context/ErrorContext';
import { OnboardingFlowContext } from '../../context/OnboardingFlowContext';
import { useQueryStringParams } from '../../hooks/useQueryStringParams';
import {
  CREATE_CHECKOUT_SESSION_MUTATION,
  GET_LOCATION_FOR_USER,
  GET_NOTIFICATIONS_QUERY,
  GET_PLAN_BY_ID_QUERY,
  GET_PLAN_FOR_USER_QUERY,
  SUBSCRIPTION_QUERY,
} from '../../services/schema';
import { useAppDispatch } from '../../store/hooks';
import { Location, Topic } from '../../store/models';
import { setIsOrg, _qrZipPath } from '../../store/slices/editorSlice';
import {
  changeLocationName,
  changeQrLogo,
  changeQrPrimaryColor,
  changeQrSecondaryColor,
  fetchLocationsByEmail,
  LogoChangePayload,
  saveCustomQr,
  saveLocation,
  _locationIsLoading,
  _organizationId,
  _qrLogo,
  _qrPrimary,
  _qrSecondary,
  _selectedLocation,
} from '../../store/slices/locationSlice';
import { _selectedTopic, _topicIsLoading, _topics } from '../../store/slices/topicSlice';
import { createCheckoutSession } from '../../types/createCheckoutSession';
import { getLocationForUser } from '../../types/getLocationForUser';
import { getScheduledNotifications } from '../../types/getScheduledNotifications';
import { AnalyticsCard } from '../Dashboard/AnalyticsCard';
import { EditCard } from '../Dashboard/EditCard';
import { NotifyCard } from '../Dashboard/NotifyCard';
import { QRCard } from '../Dashboard/QRCard';
import { LiiingoSuccessSnackbar } from '../LiiingoSuccessSnackbar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingCard: {
      position: 'relative',
      minHeight: '80vh',
    },
    containerWidth: {
      width: '100%',
    },
    topGrid: {
      margin: 0,
    },
    dashboardTitle: {
      padding: 8,
    },
  })
);

export type EngagementProps = {
  loadingLocation: boolean;
  loadingTopic: boolean;
  selectedLocation: Location;
  selectedTopic: Topic;
  qrZipPath: string;
  qrLogo: string;
  primaryColor: string;
  secondaryColor: string;
  orgId: string;
  topics: Topic[];
  saveQr: () => void;
  saveLocation: (change: Partial<Location>) => void;
  changeName: (name: string) => void;
  changeLogo: (logo: LogoChangePayload) => void;
  changePrimary: (primary: string) => void;
  changeSecondary: (secondary: string) => void;
};

export const Engagement = (props: EngagementProps) => {
  const { handleError = () => {} } = useContext(ErrorContext);
  const { identity } = useContext(AppContext);
  const history = useHistory();
  const { route, createNewOrganization, essentialTemplate } = useContext(OnboardingFlowContext);
  const urlParams = useQueryStringParams();
  const [passwordReset, setPasswordReset] = useState(!!urlParams.get('passwordReset') ?? false);
  const [emailVerified, setEmailVerified] = useState(!!urlParams.get('emailVerified') ?? false);
  const [paymentAdded, setPaymentAdded] = useState(!!urlParams.get('paymentAdded') ?? false);
  const [snackBarSuccessMessage, setSnackBarSuccessMessage] = useState('');
  const [planId, setPlanId] = useState('');
  const [billing, setBilling] = useState('');
  const {
    loadingLocation,
    loadingTopic,
    selectedLocation,
    selectedTopic,
    qrZipPath,
    qrLogo,
    primaryColor,
    secondaryColor,
    orgId,
    topics,
    saveQr,
    saveLocation,
    changeName,
    changeLogo,
    changePrimary,
    changeSecondary,
  } = { ...props };
  const classes = useStyles();

  const stripe = useStripe();

  const beginStripeCheckout = (data: createCheckoutSession) => {
    if (!data?.createCheckoutSession) {
      return;
    }
    const { sessionId } = data.createCheckoutSession;
    // Open Stripe checkout in current window
    stripe?.redirectToCheckout({
      sessionId,
    });
  };

  const [createCheckoutSession] = useMutation<createCheckoutSession>(CREATE_CHECKOUT_SESSION_MUTATION, {
    onCompleted: (data) => {
      beginStripeCheckout(data);
    },
    onError: () => {},
  });

  const [getPlanById] = useLazyQuery(GET_PLAN_BY_ID_QUERY, {
    variables: {
      id: planId,
    },
    onCompleted: (data) => {
      const productCode = billing === 'annual' ? data.planById.annualStripeId : data.planById.monthlyStripeId;
      createCheckoutSession({
        variables: {
          productCode,
          route,
          successUrl: `${process.env.REACT_APP_CLIENT_URL}/${route}/profile/engagement?paymentAdded=1`,
          cancelUrl: `${process.env.REACT_APP_CLIENT_URL}/${route}/sign-out`,
        },
      });
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
        createCheckoutSession({
          variables: {
            productCode: essentialTemplate.stripeProductCode,
            route,
            successUrl: `${process.env.REACT_APP_CLIENT_URL}/${route}/profile/engagement?paymentAdded=1`,
            cancelUrl: `${process.env.REACT_APP_CLIENT_URL}/${route}/sign-out`,
          },
        });
      }
    },
  });

  const [checkSubscription] = useLazyQuery(SUBSCRIPTION_QUERY, {
    onCompleted: (data) => {
      const isUpgraded = !!data.customerPaymentMethod;
      if (!isUpgraded && createNewOrganization) {
        //only redirect if not upgraded and its own organization
        userPlan();
      }
    },
  });

  const [getLocation, { loading, data }] = useLazyQuery<getLocationForUser>(GET_LOCATION_FOR_USER, {
    variables: {
      sub: identity?.id,
    },
    onError: () => {
      if (!notifications?.getNotifications?.notifications?.length && selectedTopic !== null) {
        getNotifications({
          variables: {
            topicId: selectedTopic.id,
          },
        });
      }
    },
    onCompleted: (data) => {
      if (!notifications?.getNotifications?.notifications?.length) {
        getNotifications({
          variables: {
            topicId: data?.user?.location?.exhibit?.liiingoExhibitId,
          },
        });
      }
    },
  });

  useEffect(() => {
    if (identity?.id) {
      checkSubscription();
      getLocation();
    }
  }, [identity?.id, getLocation, checkSubscription]);

  const [getNotifications, { data: notifications, refetch }] = useLazyQuery<getScheduledNotifications>(
    GET_NOTIFICATIONS_QUERY,
    {
      variables: {
        id: selectedTopic?.id ?? 'topicId',
      },
      onCompleted: (data) => {
        if (!data.getNotifications) {
          // If we get here, the user successfully authenticated with Cognito, but doesn't have a 'users' record in the poweredby db.
          // This could happen if there's an error during registration after the Cognito user is created.
          // It's likely that the user just signed up and has never successfully logged in before, so the risk of data loss here is low.
          Bugsnag.notify(new Error('Error getting notifications from the API'), (event) => {
            event.severity = 'error';
            event.setUser(`sub: ${identity?.id}`, identity?.email, '');
          });
          handleError('There was an error getting your scheduled notifications. Please try again in a few minutes');
        }
      },
      onError: handleError,
    }
  );

  if (loading) {
    return (
      <Card>
        <CardContent className={classes.loadingCard}>
          <Throbber withOverlay />
        </CardContent>
      </Card>
    );
  }

  return (
    <Container className={classes.containerWidth}>
      <Typography variant="h5" className={classes.dashboardTitle}>
        App Dashboard
      </Typography>
      <Snackbar open={!!snackBarSuccessMessage} autoHideDuration={6000} onClose={() => setSnackBarSuccessMessage('')}>
        <Alert severity="success" onClose={() => setSnackBarSuccessMessage('')} elevation={3}>
          {snackBarSuccessMessage}
        </Alert>
      </Snackbar>
      <LiiingoSuccessSnackbar
        open={passwordReset}
        text="Password Reset"
        onClose={() => {
          setPasswordReset(false);
          history.replace(`/${route}/profile/engagement`);
        }}
      />
      <LiiingoSuccessSnackbar
        open={emailVerified}
        text="Email verified successfully"
        onClose={() => {
          setEmailVerified(false);
          history.replace(`/${route}/profile/engagement`);
        }}
      />
      <LiiingoSuccessSnackbar
        open={paymentAdded}
        text="Payment added successfully"
        onClose={() => {
          setPaymentAdded(false);
          history.replace(`/${route}/profile/engagement`);
        }}
      />
      <Grid container spacing={2} className={classes.topGrid}>
        <Grid item container lg={7}>
          <Grid item>
            <EditCard
              loading={loadingLocation}
              location={selectedLocation}
              topic={selectedTopic}
              changeName={changeName}
              saveName={() => saveLocation({})}
            />
            <QRCard
              loading={loadingLocation || loadingTopic}
              qrCodePath={selectedTopic?.qr}
              qrLinkPath={selectedTopic?.branchLinkUrl}
              qrZipPath={qrZipPath}
              qrLogo={qrLogo}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              saveQR={saveQr}
              changeLogo={changeLogo}
              changePrimary={changePrimary}
              changeSecondary={changeSecondary}
            />
            <NotifyCard
              data={data}
              notifications={notifications}
              setSnackBarSuccessMessage={setSnackBarSuccessMessage}
              refetch={refetch}
              topics={topics}
            />
          </Grid>
        </Grid>
        <Grid item lg={5}>
          <AnalyticsCard orgId={orgId} />
        </Grid>
      </Grid>
    </Container>
  );
};

const EngagementContainer = () => {
  const dispatch = useAppDispatch();
  const { identity } = useContext(AppContext);
  const { createNewOrganization } = useContext(OnboardingFlowContext);
  useEffect(() => {
    dispatch(setIsOrg(createNewOrganization));
    dispatch(fetchLocationsByEmail(identity?.email));
  }, [dispatch, identity?.email, createNewOrganization]);

  const loadingLocation = useSelector(_locationIsLoading);
  const loadingTopic = useSelector(_topicIsLoading);
  const qrLogo = useSelector(_qrLogo);
  const primaryColor = useSelector(_qrPrimary);
  const secondaryColor = useSelector(_qrSecondary);
  const selectedTopic = useSelector(_selectedTopic);
  const selectedLocation = useSelector(_selectedLocation);
  const qrZipPath = useSelector(_qrZipPath);
  const orgId = useSelector(_organizationId);
  const topics = useSelector(_topics);

  const state = {
    loadingLocation,
    loadingTopic,
    selectedLocation,
    selectedTopic,
    qrZipPath,
    qrLogo,
    primaryColor,
    secondaryColor,
    orgId,
    topics,
  };

  const actions = bindActionCreators(
    {
      changeName: changeLocationName,
      changeLogo: changeQrLogo,
      changePrimary: changeQrPrimaryColor,
      changeSecondary: changeQrSecondaryColor,
      saveQr: saveCustomQr,
      saveLocation: saveLocation,
    },
    dispatch
  );

  return <Engagement {...state} {...actions} />;
};

export default EngagementContainer;
