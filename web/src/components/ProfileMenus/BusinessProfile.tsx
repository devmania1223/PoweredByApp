import { useLazyQuery, useMutation } from '@apollo/client';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { OrganizationInfoForm, Throbber } from '../';
import { AppContext } from '../../context/AppContext';
import { ErrorContext } from '../../context/ErrorContext';
import { OnboardingFlowContext } from '../../context/OnboardingFlowContext';
import OrganizationRegistrationStepper from '../../pages/OrganizationRegistrationStepper';
import { GET_LOCATION_FOR_USER, REGISTER_MUTATION, REGISTER_NEW_ORG_MUTATION } from '../../services/schema';
import { getLocationForUser } from '../../types/getLocationForUser';
import { DynamicFormStateParent } from '../DynamicFormStateParent';
import { OrganizationAppContentForm } from '../OrganizationAppContentForm';
import { QrCodeCustomizationForm } from '../QrCodeCustomizationForm';
import { TemplateViewer } from '../TemplateViewer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
      marginBottom: 20,
    },
    formCard: {
      marginBottom: 20,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
    },
    freeBackdropText: {
      marginBottom: 20,
    },
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-start',
    },
    backdropCard: {
      maxWidth: 408,
    },
    phoneViewerRoot: {
      position: 'fixed',
    },
    loadingCard: {
      minHeight: '80vh',
    },
    creatingAppCard: {
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 50,
    },
  })
);

export const OrganizationProfile = () => {
  const { handleError } = useContext(ErrorContext);
  const { createNewOrganization, route, organization } = useContext(OnboardingFlowContext);
  const { identity } = useContext(AppContext);
  const flowContext = useContext(OnboardingFlowContext);
  const [dynamicTemplateIsLoading, setDynamicTemplateIsLoading] = useState(false);
  const sendDataToGTM = useGTMDispatch();

  const [getLocation, { loading: locationForUserIsLoading, data, refetch: refetchLocationForUser }] =
    useLazyQuery<getLocationForUser>(GET_LOCATION_FOR_USER, {
      variables: {
        sub: identity?.id,
      },
      onError: handleError,
      onCompleted: (data) => {
        if (!data.user) {
          // Capture first time SSO user
          sendDataToGTM({
            event: 'sign_up',
            username: identity.username,
            route: flowContext.route,
          });
          if (createNewOrganization) {
            registerNewOrgMutation({
              variables: {
                onboardingRoute: route,
                // referrer,
                termsOfService: true,
              },
            });
          } else {
            registerMutation({
              variables: {
                onboardingRoute: route,
                organizationId: organization?._id,
                // referrer,
                termsOfService: true,
              },
            });
          }
        }
      },
    });
  const [registerNewOrgMutation, { loading: newOrgMutationLoading, error: registerNewOrgError }] = useMutation(
    REGISTER_NEW_ORG_MUTATION,
    {
      onCompleted: refetchLocationForUser,
      onError: handleError,
    }
  );
  const [registerMutation, { loading: orgMutationLoading, error: registerError }] = useMutation(REGISTER_MUTATION, {
    onCompleted: refetchLocationForUser,
    onError: handleError,
  });
  const classes = useStyles();

  useEffect(() => {
    if (identity?.id) {
      getLocation();
    }
  }, [identity?.id, getLocation]);

  if (locationForUserIsLoading) {
    return (
      <Card className={classes.formCard}>
        <CardContent className={classes.loadingCard}>
          <Throbber withOverlay />
        </CardContent>
      </Card>
    );
  }

  if (newOrgMutationLoading || orgMutationLoading) {
    return (
      <Card className={classes.formCard}>
        <CardContent className={classes.creatingAppCard}>
          <Typography variant="h4">We're creating your new app!</Typography>
          <Typography variant="body1">(it should be ready in about 30 seconds)</Typography>
          <Throbber />
        </CardContent>
      </Card>
    );
  }

  if (registerError || registerNewOrgError) {
    return (
      <Card className={classes.formCard}>
        <CardContent className={classes.creatingAppCard}>
          <Typography variant="h4">Oh no!</Typography>
          <Typography variant="body1" paragraph>
            It looks like we can't create a new Liiingo app for you with this email: {identity.email}
          </Typography>
          <Typography variant="body1" paragraph>
            If you have an existing Liiingo app already, please chat with our support team to start a new free trial
            (they're waiting for you inside the red circle at the bottom of your screen!)
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const DynamicForm = null;
  const DiyFormLayout = () => (
    <>
      <Card variant="outlined" className={classes.formCard}>
        <CardHeader title="Contact info for your Organization" />
        <CardContent>
          <OrganizationInfoForm
            onCancel={() => {}}
            cancelButtonLabel=""
            onSuccess={() => {}}
            submitButtonLabel="Save"
            onError={handleError}
          />
        </CardContent>
      </Card>
      <Card variant="outlined" className={classes.formCard}>
        <CardHeader title="Background & Logo Images" />
        <CardContent>
          <OrganizationAppContentForm
            onCancel={() => {}}
            cancelButtonLabel=""
            onSuccess={() => {}}
            submitButtonLabel="Save"
            onError={handleError}
          />
        </CardContent>
      </Card>
      <Card variant="outlined" className={classes.formCard}>
        {/* The dynamicTemplate should provide its own section title - there's no CardHeader here */}
        <CardContent>
          {dynamicTemplateIsLoading || !data?.user?.location ? (
            <CircularProgress />
          ) : (
            <DynamicFormStateParent
              templatedContent={data.user.location.exhibit.templatedContent}
              locationId={data.user.location._id}
              contentMap={null}
            >
              <DynamicForm
                appOnboardingFlow={flowContext}
                setIsLoading={setDynamicTemplateIsLoading}
                liiingoContent={data.user.location.exhibit.templatedContent || []}
                locationId={data.user.location._id}
                cancelButtonLabel={null}
              />
            </DynamicFormStateParent>
          )}
        </CardContent>
      </Card>
      <Card variant="outlined" className={classes.formCard}>
        <CardHeader title="Customize your QR Code" />
        <CardContent>
          <QrCodeCustomizationForm
            onCancel={() => {}}
            cancelButtonLabel=""
            onSuccess={() => {}}
            submitButtonLabel="Save"
            onError={handleError}
          />
        </CardContent>
      </Card>
    </>
  );

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} md={7}>
          <Switch>
            <Route path={['/profile/organization/guided-setup/:step', '/profile/organization/guided-setup']}>
              <OrganizationRegistrationStepper />
            </Route>
            <Route path="*">
              {/* {!data?.user?.location?.name ? (
                <Redirect to={'/profile/organization/guided-setup/0?ftu=true'} />
              ) : ( */}
              <DiyFormLayout />
              {/* )} */}
            </Route>
          </Switch>
        </Grid>
        <Grid item>
          <Hidden smDown>
            <Box className={classes.phoneViewerRoot}>
              {data?.user?.location && <TemplateViewer location={data?.user?.location} />}
            </Box>
          </Hidden>
        </Grid>
      </Grid>
    </Box>
  );
};
