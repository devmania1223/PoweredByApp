import { useContext } from 'react';
import { useHistory } from 'react-router';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';

export const useChangeRoute = (path) => {
  const history = useHistory();
  const { route } = useContext(OnboardingFlowContext);

  const changeRoute: () => void = async () => {
    history.push(`/${route}/profile/${path}`);
  };

  return changeRoute;
};
