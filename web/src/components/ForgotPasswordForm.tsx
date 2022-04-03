import { Auth } from '@aws-amplify/auth/lib-esm/Auth';
import { makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useHistory } from 'react-router-dom';
import { Throbber } from '.';
import { AppContext } from '../context/AppContext';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';
import { useQueryStringParams } from '../hooks/useQueryStringParams';
import { colors } from '../theme/palette';
import { InfoLink } from './InfoLink';

export type Props = {
  email?: string;
};

type FormValues = {
  email: string;
  confirmationCode: string;
  password: string;
};

const useStyles = makeStyles(() => ({
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
  passwordContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
}));

export const ForgotPasswordForm = ({ email: initialEmail = '' }: Props) => {
  const [error, setError] = useState('');
  const [showConfirmationFields, setShowConfirmationFields] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { register, getValues, errors, watch, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: initialEmail,
      confirmationCode: '',
      password: '',
      password2: '',
    },
  });
  watch('password');

  const { refreshAppContext } = useContext(AppContext);
  const { route } = useContext(OnboardingFlowContext);
  const urlParams = useQueryStringParams();
  const email = urlParams.get('email');
  const code = urlParams.get('code');

  useEffect(() => setShowConfirmationFields(!!email && !!code), [email, code]);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      if (showConfirmationFields) {
        await Auth.forgotPasswordSubmit(email, code, data.password);
        await Auth.signIn(email, data.password);
        refreshAppContext();
        history.push(`/${route}/profile/engagement?passwordReset=1`);
      } else {
        await Auth.forgotPassword(data.email, { route });
        setShowSuccess(true);
        setError('');
      }
    } catch (error) {
      setShowSuccess(false);
      setError(error.message);
    }
  };

  const validationMessages = {
    requiredMessage: 'This field is required',
    passwordsMatch: 'Password fields must match',
    passwordLength: 'Your password must be at least 8 characters',
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Grid container direction="row" className={classes.fillHeight}>
        <Grid container item direction="row" xs={12} spacing={0} className={classes.topOfForm}>
          {!showConfirmationFields && (
            <>
              {showSuccess && (
                <Grid item xs={12}>
                  <Alert severity="success">Success! An email was sent with a code confirming your email</Alert>
                </Grid>
              )}
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}
              {!showSuccess && (
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Enter the email address for your Liiingo account. We’ll send a confirmation link to allow you to set
                    a new password
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email Address"
                  type="email"
                  name="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  margin="normal"
                  inputRef={register({ required: validationMessages.requiredMessage })}
                />
              </Grid>
            </>
          )}
          {showConfirmationFields && (
            <>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="New Password"
                  type="password"
                  name="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  margin="normal"
                  inputRef={register({
                    required: validationMessages.requiredMessage,
                    minLength: { value: 8, message: validationMessages.passwordLength },
                  })}
                />
                <Suspense fallback={<Throbber />}>
                  <PasswordStrengthBar password={getValues('password')} minLength={8} />
                </Suspense>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm New Password"
                  fullWidth
                  variant="outlined"
                  type="password"
                  name="password2"
                  error={!!errors.password2}
                  helperText={errors?.password2?.message}
                  margin="normal"
                  inputRef={register({
                    required: validationMessages.requiredMessage,
                    validate: () =>
                      getValues('password') !== getValues('password2') ? validationMessages.passwordsMatch : undefined,
                  })}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Button type="submit" fullWidth color="primary" variant="contained">
              {showConfirmationFields ? 'Reset Password' : 'Send Code'}
            </Button>
          </Grid>
        </Grid>
        <Grid container item direction="row" xs={12} className={classes.bottomOfForm}>
          <Grid item xs={12} className={classes.centerMyContentPlease}>
            <Typography variant="body2">
              Remember your password? <InfoLink to="sign-in">Sign In</InfoLink>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
