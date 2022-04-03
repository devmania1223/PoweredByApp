import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import React, { useContext } from 'react';
import { Route, Switch, useHistory, useParams } from 'react-router-dom';
import { OrganizationInfoForm, OrganizationAppContentForm, QrCodeCustomizationForm } from '../components';
import { ErrorContext } from '../context/ErrorContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
      minWidth: 320,
    },
    paperContent: {
      padding: 20,
    },
    stepperRoot: {
      padding: '0 0 24px 0',
    },
    formContainer: {
      backgroundColor: theme.palette.background.paper,
    },
  })
);

type OrganizationRegistrationStepperProps = {};
const OrganizationRegistrationStepper = (props: OrganizationRegistrationStepperProps) => {
  const { handleError } = useContext(ErrorContext);
  const { step } = useParams<{ step: string }>();
  const numericStep = parseInt(step, 10) || 0;
  const history = useHistory();

  const classes = useStyles();

  const stepLabels = ['Basic info', 'Add content to your app', 'Customize Your QR Code', 'Your links'];

  const advanceToNextStep = async () => {
    // If you're currently on the last step of registration, advancing will take you to the dashboard ('/' route)
    if (numericStep === stepLabels.length - 1) {
      setTimeout(() => history.push('/'), 0);
    } else {
      // Wait to navigate until async stuff has been cleared from the call stack
      setTimeout(() => history.push(`/profile/organization/guided-setup/${numericStep + 1}`), 0);
    }
  };

  const goBackToPreviousStep = async () => {
    if (numericStep !== 0) {
      // Wait to navigate until async stuff has been cleared from the call stack
      setTimeout(() => history.push(`/profile/organization/guided-setup/${numericStep - 1}`), 0);
    }
  };

  const NextButtonLabel = () => (
    <>
      Next <ChevronRight />
    </>
  );
  const CancelButtonLabel = () => (
    <>
      <ChevronLeft /> Back
    </>
  );

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Paper className={classes.paperContent}>
        <Stepper activeStep={numericStep} alternativeLabel classes={{ root: classes.stepperRoot }}>
          {stepLabels.map((stepLabel) => (
            <Step key={stepLabel}>
              <StepLabel>{stepLabel}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box className={classes.formContainer}>
          <Switch>
            <Route exact path={['/profile/organization/guided-setup', '/profile/organization/guided-setup/0']}>
              <OrganizationInfoForm
                onSuccess={advanceToNextStep}
                onCancel={() => {}}
                onError={handleError}
                cancelButtonLabel=""
                submitButtonLabel={<NextButtonLabel />}
              />
            </Route>
            <Route exact path="/profile/organization/guided-setup/1">
              <OrganizationAppContentForm
                onSuccess={advanceToNextStep}
                submitButtonLabel={<NextButtonLabel />}
                onCancel={goBackToPreviousStep}
                cancelButtonLabel={<CancelButtonLabel />}
                onSkip={advanceToNextStep}
              />
            </Route>
            <Route exact path="/profile/organization/guided-setup/2">
              <QrCodeCustomizationForm
                onSuccess={advanceToNextStep}
                submitButtonLabel={<NextButtonLabel />}
                onCancel={goBackToPreviousStep}
                cancelButtonLabel={<CancelButtonLabel />}
                onSkip={advanceToNextStep}
              />
            </Route>
          </Switch>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrganizationRegistrationStepper;
export type { OrganizationRegistrationStepperProps };
