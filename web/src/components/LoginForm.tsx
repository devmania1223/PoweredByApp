import { Auth } from '@aws-amplify/auth/lib-esm/Auth';
import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';
import { colors } from '../theme/palette';
import { BlockingModal } from './BlockingModal';
import { SSOButton } from './Buttons';
import { InfoLink } from './InfoLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    planLink: {
      textDecoration: 'none',
      fontWeight: 'bold',
      color: colors.tealAccent,
    },
  })
);

export type Props = {
  email?: string;
  submitButtonText?: string;
  type?: string;
};

type FormValues = {
  email: string;
  password: string;
  confirmationCode: string;
};

export const LoginForm = ({ email: initialEmail = '', submitButtonText = 'Login' }: Props) => {
  const [showLoginError, setShowLoginError] = useState(false);
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const { refreshAppContext } = useContext(AppContext);
  const { route } = useContext(OnboardingFlowContext);
  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: initialEmail,
      password: '',
      confirmationCode: '',
    },
  });
  const history = useHistory();
  const classes = useStyles();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (showConfirmEmail) {
      await Auth.confirmSignUp(data.email, data.confirmationCode);
    }
    try {
      await Auth.signIn(data.email, data.password);
      refreshAppContext();
      history.push(`/${route}/profile`);
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
        await Auth.resendSignUp(data.email, { route });
        setShowConfirmEmail(true);
      }
      setShowLoginError(true);
    }
  };

  const validationMessages = {
    requiredMessage: 'This field is required',
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <BlockingModal open={showConfirmEmail} fullPage={false}>
        <Card>
          <CardHeader title="Enter the code that was emailed to you" />
          <CardContent>
            <Grid container spacing={1} className={classes.fillHeight}>
              <Grid item xs={12} md={8}>
                <TextField
                  label="Confirmation Code"
                  fullWidth
                  variant="outlined"
                  type="text"
                  name="confirmationCode"
                  error={!!errors.confirmationCode}
                  helperText={errors?.confirmationCode?.message}
                  inputRef={register}
                />
              </Grid>
              <Grid item container alignContent="flex-end" justify="flex-end" xs={12} md={4}>
                <Button role="button" type="submit" variant="contained">
                  CONFIRM
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </BlockingModal>
      <Grid container direction="row" className={classes.fillHeight}>
        <Grid container item direction="row" xs={12} spacing={2} className={classes.topOfForm}>
          {showLoginError && (
            <Grid item xs={12}>
              <Alert severity="error">Invalid email/password</Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              name="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
              margin="normal"
              inputRef={register({ required: validationMessages.requiredMessage })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              label="Password"
              type="password"
              name="password"
              error={!!errors?.password}
              helperText={errors?.password?.message}
              margin="normal"
              inputRef={register({ required: validationMessages.requiredMessage })}
            />
          </Grid>
          <Grid item xs={12}>
            <InfoLink to="forgot-password">Forgot Your Password?</InfoLink>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" data-cy="loginButton" fullWidth>
              {submitButtonText}
            </Button>
          </Grid>
          <Grid item container xs={12} style={{ paddingTop: 16, paddingBottom: 16 }}>
            <Grid item xs={4}>
              <hr className={classes.horizontalLine} />
            </Grid>
            <Grid item xs={4} className={classes.centerMyContentPlease}>
              <Typography variant="body2" className={classes.orSignInWithText}>
                or sign in with
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
        <Grid item container direction="row" xs={12} className={classes.bottomOfForm}>
          <Grid item xs={12} className={classes.centerMyContentPlease}>
            <Typography variant="body2">
              Need to create an account?{' '}
              <a className={classes.planLink} href="https://www.liiingo.com/pricing">
                View Plans and Pricing
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
