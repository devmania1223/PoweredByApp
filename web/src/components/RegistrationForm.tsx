import { useMutation, useQuery } from '@apollo/client';
import { Auth } from '@aws-amplify/auth/lib-esm/Auth';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { Box, Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import React, { CSSProperties, lazy, Suspense, useContext, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';
import {
  CREATE_CHECKOUT_SESSION_MUTATION,
  GET_PLAN_BY_NAME_QUERY,
  REGISTER_MUTATION,
  REGISTER_NEW_ORG_MUTATION,
} from '../services/schema';
import { useQueryStringParams } from '../hooks/useQueryStringParams';
import { colors } from '../theme/palette';
import { getPlanByName } from '../types/getPlanByName';
import { ACCESS_TOKEN, ID_TOKEN } from '../util/constants';
import { Throbber } from './';
import { BlockingModal } from './BlockingModal';
import { SSOButton } from './Buttons';
import { InfoLink } from './InfoLink';
import { createCheckoutSession } from '../types/createCheckoutSession';
import { useStripe } from '@stripe/react-stripe-js';

// lazy loading this because it's large
const PasswordStrengthBar = lazy(() => import('react-password-strength-bar'));

export type Props = {
  firstName?: string;
  lastName?: string;
  email?: string;
  submitButtonText?: string;
  styles?: CSSProperties;
  onboardingRoute: string;
  organizationId: string;
  referrer?: string;
};

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
  confirmationCode: string;
  termsOfService: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'flex',
    flexGrow: 1,
  },
  fillHeight: {
    flexGrow: 1,
  },
  centerMyContentPlease: {
    textAlign: 'center',
  },
  topOfForm: {
    height: 'min-content',
  },
  bottomOfForm: {
    flexGrow: 1,
    alignItems: 'flex-end',
  },
  horizontalLine: {
    border: `1px solid ${colors.graySecondaryLight}`,
  },
  orSignInWithText: {
    lineHeight: 1,
  },
  verifyButton: {
    marginTop: 20,
  },
  pageTitle: {
    paddingBottom: theme.spacing(4),
  },
}));

export const RegistrationForm = ({
  firstName: initialFirstName = '',
  lastName: initialLastName = '',
  email: initialEmail = '',
  submitButtonText = 'Create Account',
  onboardingRoute,
  organizationId,
  referrer,
}: Props) => {
  const PRE_REG = 'pre-reg';
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const [termsOfService, setTermsOfService] = useState('false');
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const onboardingFlowContext = useContext(OnboardingFlowContext);
  const { refreshAppContext } = useContext(AppContext);
  const history = useHistory();
  const classes = useStyles();

  const urlParams = useQueryStringParams();
  const urlEmail = urlParams.get('email');
  const password = localStorage.getItem(PRE_REG);
  const urlTermsOfService = Boolean(urlParams.get('termsOfService'));
  const code = urlParams.get('code');

  const planName = urlParams.get('plan');
  const billing = urlParams.get('billing');

  const sendDataToGTM = useGTMDispatch();
  const { register, errors, formState, getValues, handleSubmit, watch, control } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: initialFirstName,
      lastName: initialLastName,
      email: initialEmail,
      password: '',
      password2: '',
      confirmationCode: '',
      termsOfService: false,
    },
  });
  watch('password');

  const onResend = async () => {
    try {
      await Auth.resendSignUp(email, { route: onboardingRoute, termsOfService, plan: planName, billing });
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const { loading: planLoading, data: plan } = useQuery<getPlanByName>(GET_PLAN_BY_NAME_QUERY, {
    variables: {
      name: planName,
    },
    onError: () => {
      // not found, ok to continue
      if (!!urlEmail && !!termsOfService && !!code && !!password) {
        signUp();
      }
    },
    onCompleted: (data) => {
      if (!!urlEmail && !!termsOfService && !!code && !!password) {
        signUp(data?.planByName?._id ?? null);
      }
    },
  });

  const stripe = useStripe();

  const beginStripeCheckout = (data: createCheckoutSession) => {
    console.log(plan);
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

  const [createCheckoutSession] = useMutation<createCheckoutSession>(CREATE_CHECKOUT_SESSION_MUTATION, {
    onCompleted: (data) => {
      beginStripeCheckout(data);
    },
    onError: () => {},
    variables: {
      productCode:
        onboardingFlowContext.route === 'essentials'
          ? billing === 'annual'
            ? plan?.planByName?.annualStripeId
            : plan?.planByName?.monthlyStripeId
          : onboardingFlowContext.essentialTemplate.stripeProductCode,
      route: onboardingFlowContext.route,
      successUrl: `${process.env.REACT_APP_CLIENT_URL}/${onboardingFlowContext.route}/profile/engagement?emailVerified=1`,
      cancelUrl: `${process.env.REACT_APP_CLIENT_URL}/${onboardingFlowContext.route}/sign-out`,
    },
  });

  const signUp = async (planId?: string) => {
    setShowConfirmEmail(false);
    await Auth.confirmSignUp(urlEmail, code);
    localStorage.removeItem(PRE_REG);
    const loginResponse = await Auth.signIn(urlEmail, password);
    localStorage.setItem(ID_TOKEN, loginResponse.signInUserSession.idToken.jwtToken);
    localStorage.setItem(ACCESS_TOKEN, loginResponse.signInUserSession.accessToken.jwtToken);

    sendDataToGTM({
      event: 'sign_up',
      username: loginResponse.signInUserSession.idToken.payload['cognito:username'],
      route: onboardingFlowContext.route,
    });

    if (onboardingFlowContext.createNewOrganization) {
      //lazy query here to get plan type
      registerNewOrgMutation({
        variables: {
          termsOfService: urlTermsOfService,
          onboardingRoute,
          organizationId,
          referrer,
          planId,
          billing,
        },
      });
    } else {
      registerMutation({
        variables: {
          termsOfService: urlTermsOfService,
          onboardingRoute,
          organizationId,
          referrer,
        },
      });
    }
  };

  useEffect(() => {
    if (onboardingRoute === 'essentials' && (!planName || !billing)) {
      window.open('https://www.liiingo.com/pricing', '_self').focus();
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const restrictions = plan?.planByName?.restrictions;
      await Auth.signUp({
        username: data.email,
        password: data.password,
        attributes: {
          family_name: data.lastName,
          given_name: data.firstName,
          email: data.email,
          'custom:restrictions': JSON.stringify(restrictions),
        },
        clientMetadata: {
          route: onboardingRoute,
          termsOfService: String(data.termsOfService),
          plan: planName,
          billing,
        },
      });
      setEmail(data.email);
      setShowConfirmEmail(true);
      setTermsOfService(String(data.termsOfService));
      localStorage.setItem(PRE_REG, data.password);
    } catch (error) {
      setErrorMessage(error.message);
      console.error('error signing up:', error);
    }
  };

  const onMutationCompleted = async (data) => {
    refreshAppContext();
    history.push(`profile/engagement?emailVerified=1`);
  };

  const onError = async (errors) => {
    switch (errors?.message) {
      case 'User with that email already exists':
        setErrorMessage('Somebody already signed up with that email address!');
        break;

      case 'Unable to fetch':
      default:
        setErrorMessage(
          "We can't connect to the server to complete your registration right now! Please try again in a few minutes."
        );
        break;
    }
  };

  const validationMessages = {
    requiredMessage: 'This field is required',
    passwordLength: 'Your password must be at least 8 characters',
    passwordsMatch: 'Password fields must match',
  };
  const [registerNewOrgMutation, { loading: orgLoading }] = useMutation(REGISTER_NEW_ORG_MUTATION, {
    onCompleted: createCheckoutSession,
    onError,
  });
  const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION, { onCompleted: onMutationCompleted, onError });

  return showConfirmEmail ? (
    <>
      {showSuccess && <Alert severity="success">Success! An email was sent with a link to confirm your email</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <Typography variant="h5" align="center" className={classes.pageTitle}>
        Check Your Email
      </Typography>
      <Typography>
        We sent an email to
        <b>{` ${email} `}</b>
        so you can verify the email used to create your account.
      </Typography>
      <Button
        className={classes.verifyButton}
        variant="contained"
        color="secondary"
        onClick={onResend}
        fullWidth
        disableElevation
      >
        Resend Verification Email
      </Button>
    </>
  ) : (
    <>
      <Typography variant="h5" align="center" className={classes.pageTitle}>
        Welcome to Liiingo!
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <BlockingModal open={loading || orgLoading} fullPage={false}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={12} style={{ display: 'flex', marginBottom: 16 }} justify="center">
                  <Typography variant="body1">Your app is being created, it should be ready in 30 seconds!</Typography>
                </Grid>
                <Grid item xs={12} style={{ display: 'flex' }} justify="center">
                  <Throbber />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </BlockingModal>
        <Grid container direction="row" className={classes.fillHeight}>
          <Grid container item direction="row" xs={12} spacing={2} className={classes.topOfForm}>
            <Grid item xs={12}>
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                type="text"
                name="firstName"
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
                inputRef={register({ required: validationMessages.requiredMessage })}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                type="text"
                name="lastName"
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
                inputRef={register({ required: validationMessages.requiredMessage })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                type="email"
                name="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
                inputRef={register({ required: validationMessages.requiredMessage })}
              />
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  name="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  inputRef={register({
                    required: validationMessages.requiredMessage,
                    minLength: { value: 8, message: validationMessages.passwordLength },
                  })}
                />
                <Suspense fallback={<Throbber />}>
                  <PasswordStrengthBar password={getValues('password')} minLength={8} />
                </Suspense>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Confirm Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  name="password2"
                  error={!!errors.password2}
                  helperText={errors?.password2?.message}
                  inputRef={register({
                    required: validationMessages.requiredMessage,
                    validate: () =>
                      getValues('password') !== getValues('password2') ? validationMessages.passwordsMatch : undefined,
                  })}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="termsOfService"
                control={control}
                defaultValue={false}
                rules={{ required: true }}
                render={({ value, onChange }) => {
                  const booleanChecked = value === true || value === 'true';
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="termsOfService"
                          onChange={(e) => onChange(e.target.checked)}
                          checked={booleanChecked}
                          color={errors.termsOfService ? 'secondary' : 'primary'}
                        />
                      }
                      label={
                        <Typography variant="body2">
                          By clicking this box, you acknowledge that you have read, understood, and agree to the{' '}
                          <InfoLink to="https://www.liiingo.com/termsofservice">Subscription Agreement</InfoLink> and{' '}
                          <InfoLink to="https://www.liiingo.com/privacy-policy">Privacy Policy.</InfoLink>
                        </Typography>
                      }
                      labelPlacement="end"
                    />
                  );
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                data-cy="loginButton"
                disabled={formState.isSubmitting || loading || orgLoading || planLoading}
                fullWidth
              >
                {submitButtonText}
              </Button>
            </Grid>
            <Grid item container xs={12} style={{ paddingTop: 16, paddingBottom: 16 }}>
              <Grid item xs={4}>
                <hr className={classes.horizontalLine} />
              </Grid>
              <Grid item xs={4} className={classes.centerMyContentPlease}>
                <Typography variant="body2" className={classes.orSignInWithText}>
                  or sign up with
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <hr className={classes.horizontalLine} />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.centerMyContentPlease}>
              <Box>
                <SSOButton provider="Google" />
                <SSOButton provider="Facebook" />
              </Box>
            </Grid>
          </Grid>
          <Grid container item direction="row" xs={12} className={classes.bottomOfForm}>
            <Grid item xs={12} className={classes.centerMyContentPlease}>
              <Typography variant="body2">
                I have an account. <InfoLink to="sign-in">Sign In</InfoLink>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
