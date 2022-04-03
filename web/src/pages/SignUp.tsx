import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { RegistrationForm } from '../components';
import SvgSignUp from '../components/SvgComponents/SvgSignUp';
import { OnboardingFlowContext, OnboardingFlowContextType } from '../context/OnboardingFlowContext';
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
    widthConstrainedContent: {
      minWidth: 300,
      maxWidth: 450,
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
  })
);

const SignUp = () => {
  const onboardingFlowContext = useContext(OnboardingFlowContext);

  if (onboardingFlowContext.logo) {
    return (
      <TwoPaneLayout
        heroImageUrl={onboardingFlowContext.logo}
        component={<FormPanelLayout onboardingFlowContext={onboardingFlowContext} />}
        dehero
      />
    );
  }

  return (
    <TwoPaneLayout icon={<SvgSignUp />} component={<FormPanelLayout onboardingFlowContext={onboardingFlowContext} />} />
  );
};

const FormPanelLayout = (props: { onboardingFlowContext: Partial<OnboardingFlowContextType> }) => {
  const { onboardingFlowContext } = props;
  const params = useQueryStringParams();
  const referrer = params.get('referrer') ?? undefined;
  const classes = useStyles();

  return (
    <Grid item container direction="column" alignItems="center" className={classes.root}>
      <Box className={classes.widthConstrainedContent}>
        <RegistrationForm
          onboardingRoute={onboardingFlowContext?.route ?? ''}
          organizationId={onboardingFlowContext?.organization?._id}
          referrer={referrer}
        />
      </Box>
    </Grid>
  );
};

export default SignUp;
