import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';
import { Page, PageProps } from '../pages/Page';

/**
 * Show the component only when the user is logged in
 * Otherwise, redirect the user to /sign-in page
 */
export const PrivatePageRoute = (props) => {
  const { children } = props;
  const { accessToken, identity } = useContext(AppContext);
  const { route } = useContext(OnboardingFlowContext);
  if (!accessToken) {
    return <Redirect to={`/${route}/sign-in`} />;
  }

  return identity ? React.Children.only(children) : <div>Loading</div>;
};

/**
 * Renders the Route inside a <Page> component, which means the LeftNav will be available and
 * the <children> passed to the Route will be rendered inside the content panel of the app layout.
 * This is intended to be used via the <PageWithNavRoute> and <PageWithoutNavRoute> components,
 * but could be used directly if we find a need in the future.
 */
const PageRoute: React.FC<RouteProps & PageProps> = (props) => {
  const { menuItems, bottomMenuItems, hideLeftNav = false, ...routeProps } = props;
  return (
    <Page menuItems={menuItems} bottomMenuItems={bottomMenuItems} hideLeftNav={hideLeftNav}>
      <Route {...routeProps} />
    </Page>
  );
};

/**
 * Renders the Route inside a <Page> component with LeftNav visible
 */
export const PageWithNavRoute: React.FC<RouteProps & PageProps> = (props) => {
  const { hideLeftNav, ...rest } = props; // We're going to throw away the 'hideLeftNav' prop
  return <PageRoute {...rest} hideLeftNav={false} />;
};

/**
 * Renders the Route inside a <Page> component with LeftNav HIDDEN
 */
export const PageWithoutNavRoute: React.FC<RouteProps & PageProps> = (props) => {
  const { hideLeftNav, ...rest } = props; // We're going to throw away the 'hideLeftNav' prop
  return <PageRoute {...rest} hideLeftNav={true} />;
};
