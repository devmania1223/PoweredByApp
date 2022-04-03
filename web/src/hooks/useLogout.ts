import { useApolloClient } from '@apollo/client';
import { Auth } from 'aws-amplify';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';
import { ACCESS_TOKEN, ID_TOKEN } from '../util/constants';

export const useLogout = () => {
  const history = useHistory();
  const { route } = useContext(OnboardingFlowContext);
  const client = useApolloClient();

  const logout: () => void = async () => {
    client.clearStore();
    localStorage.removeItem(ID_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);
    await Auth.signOut();
    history.push(`/${route}/sign-in`);
  };

  return logout;
};
