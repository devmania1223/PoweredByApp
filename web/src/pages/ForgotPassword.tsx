import { makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createStyles } from '@material-ui/styles';
import React, { useContext } from 'react';
import { ForgotPasswordForm } from '../components';
import SvgForgotPassword from '../components/SvgComponents/SvgForgotPassword';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';
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

const ForgotPassword = () => {
  const onboardingFlowContext = useContext(OnboardingFlowContext);

  if (onboardingFlowContext.logo) {
    return <TwoPaneLayout heroImageUrl={onboardingFlowContext.logo} component={<FormPanelLayout />} dehero />;
  }

  return <TwoPaneLayout icon={<SvgForgotPassword />} component={<FormPanelLayout />} />;
};

const FormPanelLayout = () => {
  const classes = useStyles();
  return (
    <Grid item container direction="column" alignItems="center" className={classes.root}>
      <Box className={classes.widthConstrainedContent}>
        <Typography variant="h5" align="center" className={classes.pageTitle}>
          Reset Password
        </Typography>
        <ForgotPasswordForm />
      </Box>
    </Grid>
  );
};

export default ForgotPassword;
