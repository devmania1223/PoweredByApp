import { useContext } from 'react';
import { useHistory } from 'react-router';
import { OnboardingFlowContext } from '../context/OnboardingFlowContext';

export const useToAccount = () => {
  const history = useHistory();
  const { route } = useContext(OnboardingFlowContext);

  const toAccount: () => void = async () => {
    history.push(`/${route}/profile/billing`);
  };

  return toAccount;
};
