import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { Auth } from 'aws-amplify';
import jwt from 'jsonwebtoken';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN, ID_TOKEN } from '../util/constants';

export const AppContext = React.createContext<Partial<AppContextType>>({});

export type AppContextType = {
  accessToken: string;
  refreshAppContext: Function;
  refreshToken?: string; // not implemented - we'll also need a 'setRefreshToken' function
  identity: Identity;
};

export type Identity = {
  id: string | (() => string);
  organizationId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  restrictions?: Restrictions;
  phoneNumber?: string;
  permissions?: {
    manageUsers: boolean;
    manageBilling: boolean;
    manageBusinessProfile: boolean;
    uploadPatientDocuments: boolean;
  };
};

export type Restrictions = {
  pageLimit?: number;
};

export const populateIdentity = (idToken) => {
  //switch this over to use user keys eventually
  const decodedIdToken = !!idToken ? jwt.decode(idToken) : null;
  if (!decodedIdToken) {
    return null;
  }

  const identity = {
    id: decodedIdToken['sub'] as string,
    username: decodedIdToken['cognito:username'], // We need this property to use the CognitoIdentityServiceProvider.adminDisableUser() function
    firstName: decodedIdToken['given_name'],
    lastName: decodedIdToken['family_name'],
    email: decodedIdToken['email'],
    phoneNumber: decodedIdToken['phone_number'],
    permissions: decodedIdToken['permissions'],
    restrictions: decodedIdToken['custom:restrictions']
      ? JSON.parse(decodedIdToken['custom:restrictions'])
      : decodedIdToken['custom:restrictions'],
    /**
     * @deprecated Don't rely on this since a user can belong to multiple organizations. Looks at the User permissions to determine which orgs they belong to.
     */
    organizationId: decodedIdToken['organizationId'],
  };

  return identity;
};

export const AppContextProvider = ({ children }: { children: any }) => {
  const [loading, setLoading] = useState(true);
  const refreshToken = '';
  const history = useHistory();
  const sendDataToGTM = useGTMDispatch();

  const [appContext, setAppContext] = useState<AppContextType>({
    accessToken: localStorage.getItem(ACCESS_TOKEN),
    refreshAppContext: () => {},
    refreshToken,
    identity: null,
  });

  const refreshAppContext = useCallback(async () => {
    let accessToken = null;
    let idToken = null;
    try {
      setLoading(true);
      let currentUser = await Auth.currentAuthenticatedUser();

      idToken = currentUser.signInUserSession.idToken.jwtToken;
      localStorage.setItem(ID_TOKEN, idToken);

      accessToken = currentUser.signInUserSession.accessToken.jwtToken;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
    } catch (e) {
      if (e !== 'The user is not authenticated') {
        history.push(`/`);
      }
    } finally {
      const identity = populateIdentity(idToken);
      setAppContext({
        accessToken,
        refreshAppContext,
        refreshToken,
        identity,
      });
      setLoading(false);
      if (identity?.username) {
        sendDataToGTM({ username: identity.username });
      }
    }
  }, [history, sendDataToGTM]);

  useEffect(() => {
    refreshAppContext();
  }, [refreshAppContext]);

  return <AppContext.Provider value={appContext}>{loading ? null : children}</AppContext.Provider>;
};
