import Amplify from '@aws-amplify/core/lib-esm/Amplify';
import AccountCircleIcon from '@material-ui/icons/AccountCircleOutlined';
import HelpOutline from '@material-ui/icons/HelpOutline';
import AppIcon from '@material-ui/icons/InsertDriveFileOutlined';
import { default as React, Suspense, useContext, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Throbber } from './components';
import { LeftNavMenuItem } from './components/Navigation/LeftNav';
import { AccountSettings, Engagement } from './components/ProfileMenus';
import { OnboardingFlowContext } from './context/OnboardingFlowContext';
import { RedirectToStripeCheckout } from './pages/RedirectToStripeCheckout';
import { LIIINGO_HELP_URL, TITLE_MAP } from './util/constants';
import { PageWithNavRoute, PageWithoutNavRoute, PrivatePageRoute } from './util/SpecialRoutes';
const PaymentCanceled = React.lazy(() => import('./pages/PaymentCanceled'));
const PaymentConfirmation = React.lazy(() => import('./pages/PaymentConfirmation'));
const Profile = React.lazy(() => import('./pages/Profile'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignOut = React.lazy(() => import('./pages/SignOut'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const AppEditor = React.lazy(() => import('./pages/AppEditor'));

/**
 * The 'route' and 'locationsThatMatch' properties behave differently depending on whether the leading slash is included or not.
 * Just a heads up when you're debugging weird routing behavior...
 */
Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_COGNITO_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_ID,
    mandatorySignIn: false,
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    oauth: {
      domain: [process.env.REACT_APP_COGNITO_OAUTH_DOMAIN],
      scope: ['email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
      redirectSignIn: [process.env.REACT_APP_COGNITO_OAUTH_REDIRECT_SIGN_IN],
      redirectSignOut: [process.env.REACT_APP_COGNITO_OAUTH_REDIRECT_SIGN_OUT],
      responseType: 'token',
    },
  },
});

const menuItems: LeftNavMenuItem[] = [
  {
    route: '/profile/billing',
    displayName: 'Account Settings',
    icon: AccountCircleIcon,
    component: AccountSettings,
  },
  {
    route: '/profile/engagement',
    displayName: 'My App',
    icon: AppIcon,
    component: Engagement,
  },
  //{
  //  route: '/profile/organization',
  //  displayName: 'App Editor',
  //  locationsThatMatch: [
  //    '/profile/organization',
  //    '/profile/organization/guided-setup',
  //    '/profile/organization/guided-setup/*',
  //  ],
  //  icon: EditIcon,
  //  component: OrganizationProfile,
  //},
  // {
  //   route: '/profile/users',
  //   displayName: 'Manage Users',
  //   icon: SupervisedUserCircle,
  //   component: ManageUsers,
  // },
];

const bottomMenuItems: LeftNavMenuItem[] = [
  {
    route: LIIINGO_HELP_URL,
    displayName: 'Support',
    icon: HelpOutline,
    component: Engagement,
  },
];

export default function App() {
  const { url } = useRouteMatch();
  const onboardingFlowContext = useContext(OnboardingFlowContext);
  const history = useHistory();

  // set page Title on location change, mostly for analytics readabilty
  useEffect(() => {
    const path = history.location.pathname.split('/');
    const title = path
      .map((subpath) => {
        // mutate path names with lookup object
        return TITLE_MAP[subpath] ?? subpath;
      })
      // remove any items that are undefined
      .filter((pageTitle) => pageTitle)
      .join(' | ');
    window.document.title = title;
  }, [history.location]);

  const appRoute = `/${onboardingFlowContext.route}/profile/organization`;

  const menuItemsWithNestedPathPrepended = menuItems.map((menuItem) => {
    return {
      ...menuItem,
      route: `/${onboardingFlowContext.route}${menuItem.route}`,
      locationsThatMatch: menuItem.locationsThatMatch?.map(
        (locationToMatch) => `/${onboardingFlowContext.route}${locationToMatch}`
      ),
    };
  });

  return (
    <Suspense fallback={<Throbber withOverlay />}>
      <Switch>
        <Route exact path={`/${onboardingFlowContext.route}/sign-up`} component={SignUp} />
        <Route exact path={`/${onboardingFlowContext.route}/sign-in`} component={SignIn} />
        <PageWithoutNavRoute exact path={`/${onboardingFlowContext.route}/sign-out`} component={SignOut} />
        <Route exact path={`/${onboardingFlowContext.route}/forgot-password`} component={ForgotPassword} />
        <PageWithoutNavRoute
          exact
          path={`/${onboardingFlowContext.route}/payment-canceled`}
          component={PaymentCanceled}
        />
        <PageWithoutNavRoute
          exact
          path={`/${onboardingFlowContext.route}/payment-confirmation`}
          component={PaymentConfirmation}
        />
        <PrivatePageRoute
          exact
          path={[`/${onboardingFlowContext.route}/profile`, `/${onboardingFlowContext.route}`, '/']}
        >
          <Redirect to={`${url}/profile/engagement`} />
        </PrivatePageRoute>
        <PrivatePageRoute path={`/${onboardingFlowContext.route}/profile`}>
          <PageWithNavRoute menuItems={menuItemsWithNestedPathPrepended} bottomMenuItems={bottomMenuItems}>
            <Profile menuItems={menuItemsWithNestedPathPrepended} appRoute={appRoute} />
          </PageWithNavRoute>
        </PrivatePageRoute>

        <PrivatePageRoute path={`/${onboardingFlowContext.route}/app-editor`}>
          <AppEditor />
        </PrivatePageRoute>

        <PrivatePageRoute exact path="/checkout/:stripeSessionId">
          <RedirectToStripeCheckout />
        </PrivatePageRoute>

        {/* No need to show 404 if you're not logged in yet */}
        <PrivatePageRoute path="*" component={NotFound} menuItems={menuItemsWithNestedPathPrepended} />
      </Switch>
    </Suspense>
  );
}
