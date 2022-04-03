import { Box, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import { ErrorBanner, LoginForm } from '../components';
import SvgSignIn from '../components/SvgComponents/SvgSignIn';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';
import { useQueryStringParams } from '../hooks/useQueryStringParams';
import { TwoPaneLayout } from './TwoPaneLayout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(16),
    },
    pageTitle: {
      paddingBottom: theme.spacing(4),
    },
    widthConstrainedContent: {
      minWidth: 300,
      maxWidth: 450,
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
  })
);

const SignIn = () => {
  const onboardingFlowContext = useContext(OnboardingFlowContext);

  if (onboardingFlowContext.logo) {
    return <TwoPaneLayout heroImageUrl={onboardingFlowContext.logo} component={<FormPanelLayout />} dehero />;
  }

  return <TwoPaneLayout icon={<SvgSignIn />} component={<FormPanelLayout />} />;
};

const FormPanelLayout = () => {
  const params = useQueryStringParams();
  const classes = useStyles();

  const sessionExpired = params.get('sessionExpired');

  return (
    <>
      {sessionExpired && <ErrorBanner title="" message="Your session expired" />}

      <Grid item container direction="column" alignItems="center" className={classes.root}>
        <Box className={classes.widthConstrainedContent}>
          <Typography variant="h5" align="center" className={classes.pageTitle}>
            Welcome Back!
          </Typography>
          <LoginForm submitButtonText="Sign In" />
        </Box>
      </Grid>
    </>
  );
};

export default SignIn;
