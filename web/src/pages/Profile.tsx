import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import React, { useContext, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { drawerWidth } from '../components/AppEditor/LiiingoDrawer';
import { FlatButton } from '../components/Buttons';
import { LeftNavMenuItem } from '../components/Navigation/LeftNav';
import { OrganizationProfile } from '../components/ProfileMenus';
import { AppContext } from '../context/AppContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      paddingTop: theme.spacing(1), // Don't let content overlap the floating logo button
    },
    content: {
      backgroundColor: theme.palette.background.default,
    },
    backdropCard: {
      maxWidth: 704,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  })
);

export type ProfilePageProps = {
  menuItems: LeftNavMenuItem[];
  appRoute: string;
};

const LimitedBackdrop = withStyles((theme: Theme) => {
  return {
    root: {
      [theme.breakpoints.up('sm')]: {
        left: drawerWidth,
      },
      zIndex: 3,
    },
  };
})(Backdrop);

const Profile = (props: ProfilePageProps) => {
  const { identity } = useContext(AppContext);
  // const [showFirstTimeSetup, setShowFirstTimeSetup] = useState(params.get('ftu') === 'true' || false);
  const [showFirstTimeSetup, setShowFirstTimeSetup] = useState(false); // Always disabled
  const { appRoute, menuItems } = props;
  const classes = useStyles();

  return (
    <Container disableGutters={true}>
      <LimitedBackdrop open={showFirstTimeSetup}>
        <Card className={classes.backdropCard}>
          <CardHeader title={`Glad you're here, ${identity?.firstName}!`} />
          <CardContent>
            <Typography variant="h2">Let's get started</Typography>
            <Typography paragraph>Here's some resources to get you up and running:</Typography>
            <Typography variant="h2">You can upgrade whenever you want</Typography>
            <Typography paragraph>Here's what you'll get:</Typography>
            <Grid container justifyContent="flex-end">
              <FlatButton
                variant="contained"
                color="primary"
                onClick={() => setShowFirstTimeSetup(false)}
                data-cy="ftu-modal-close"
              >
                I'm ready
              </FlatButton>
            </Grid>
          </CardContent>
        </Card>
      </LimitedBackdrop>
      <div className={classes.root}>
        <Container component="main" className={classes.content} maxWidth="md">
          {/* Removing trial widget for now */}
          {/* <TrialDaysWidget /> */}
          <Switch>
            {menuItems.map((menu) => (
              // If an array of 'locationsThatMatch' is defined for this menu item, attempt to match those first.
              // Otherwise, just match the route that the leftNav item links to.
              // This allows pages with children to perform their own subrouting.
              <Route exact path={menu.locationsThatMatch ?? menu.route} key={menu.route}>
                <menu.component />
              </Route>
            ))}
            <Route exact path={appRoute} key={appRoute}>
              <OrganizationProfile />
            </Route>
          </Switch>
        </Container>
      </div>
    </Container>
  );
};

export default Profile;
