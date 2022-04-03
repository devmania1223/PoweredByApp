import { useQuery } from '@apollo/client';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import React, { ReactNode } from 'react';
import { match, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { GET_APP_ONBOARDING_FLOW_BY_ROUTE } from '../services/schema';
import {
  getAppOnboardingFlowByRoute,
  getAppOnboardingFlowByRoute_appOnboardingFlowByRoute_essentialTemplate,
  getAppOnboardingFlowByRoute_appOnboardingFlowByRoute_organization,
} from '../types/getAppOnboardingFlowByRoute';
import { ROUTE } from '../util/constants';
export const OnboardingFlowContext = React.createContext<Partial<OnboardingFlowContextType>>({});

export type OnboardingFlowContextType = {
  route: string;
  organization?: getAppOnboardingFlowByRoute_appOnboardingFlowByRoute_organization;
  createNewOrganization: boolean;
  logo?: string;
  favicon?: string;
  essentialTemplate?: getAppOnboardingFlowByRoute_appOnboardingFlowByRoute_essentialTemplate;
};

type Props = {
  match: match<{ onboardingRoute?: string }>;
  children: ReactNode;
};
export const LookupOnboardingFlowAndInjectItIntoContext = ({ match = null, children }: Props) => {
  const sendDataToGTM = useGTMDispatch();
  const history = useHistory();
  const { data } = useQuery<getAppOnboardingFlowByRoute>(GET_APP_ONBOARDING_FLOW_BY_ROUTE, {
    variables: {
      route: match?.params?.onboardingRoute?.toLowerCase(),
    },
    onCompleted: (data) => {
      if (data.appOnboardingFlowByRoute) {
        sendDataToGTM({ route: match.params.onboardingRoute });
        localStorage.setItem(ROUTE, match.params.onboardingRoute);
      } else {
        alert("Invalid route, redirecting to 'essentials'");
        localStorage.setItem(ROUTE, 'essentials');
        history.push(`/essentials/sign-in`);
      }
    },
  });

  const context: OnboardingFlowContextType = {
    route: data?.appOnboardingFlowByRoute?.route?.toLowerCase(),
    organization: data?.appOnboardingFlowByRoute?.organization,
    createNewOrganization: data?.appOnboardingFlowByRoute?.createNewOrganization,
    logo: data?.appOnboardingFlowByRoute?.logo,
    favicon: data?.appOnboardingFlowByRoute?.favicon,
    essentialTemplate: data?.appOnboardingFlowByRoute?.essentialTemplate,
  };

  if (!data) {
    return null;
  }

  return <OnboardingFlowContext.Provider value={context}>{children}</OnboardingFlowContext.Provider>; // TODO: need a better "Loading" screen instead of null (https://app.clickup.com/t/ph3rrn)
};

export const NoRoute = () => {
  const route = localStorage.getItem(ROUTE);
  if (route !== undefined && route !== 'undefined' && route !== 'null' && route !== null) {
    return <Redirect to={`${route}/profile`} />;
  }

  // return <>NO ROUTE FOUND</>;
  return <Redirect to={`essentials/profile`} />; //defaut to "essentials" if not found in localstorage
};

export const OnboardingFlowContextProvider = ({ children }) => {
  return (
    <Switch>
      <Route
        path="/:onboardingRoute"
        render={(props) => (
          <LookupOnboardingFlowAndInjectItIntoContext {...props}>{children}</LookupOnboardingFlowAndInjectItIntoContext>
        )}
      />
      <Route path="/" component={NoRoute} />
    </Switch>
  );
};
