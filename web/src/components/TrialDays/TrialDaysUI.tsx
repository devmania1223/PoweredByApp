import { ApolloError, MutationTuple, OperationVariables } from '@apollo/client';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { useEffect, useState } from 'react';
import { createCheckoutSession } from '../../types/createCheckoutSession';
import { IS_CLOSED, IS_CLOSED_UPGRADED } from '../../util/constants';
import { DaysView } from './DaysView';
import { ExpandedView } from './ExpandedView';

export type TrialDaysUIProps = {
  isExpanded?: boolean;
  isUpgraded?: boolean;
  days: number;
  onError?: (error: string | ApolloError) => void;
  position?: SnackbarOrigin;
  createStripeCheckoutSession: MutationTuple<createCheckoutSession, OperationVariables>;
};

const defaultProps: Partial<TrialDaysUIProps> = {
  isExpanded: false,
  isUpgraded: false,
  onError: () => {},
  position: { vertical: 'bottom', horizontal: 'right' },
};

export const TrialDaysUI = (props: TrialDaysUIProps) => {
  const { createStripeCheckoutSession, days, isExpanded, isUpgraded, position, onError } = {
    ...defaultProps,
    ...props,
  };

  const [expanded, setExpanded] = useState(isExpanded);
  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  const onMinimize = (event, reason?) => {
    if (reason === 'clickaway') {
      return;
    }
    if (isUpgraded) {
      localStorage.setItem(IS_CLOSED_UPGRADED, 'true');
    } else {
      const closeDate = String(new Date().getUTCDate());
      localStorage.setItem(IS_CLOSED, closeDate);
    }
    setExpanded(false);
  };

  const expandedProps = {
    days: days,
    position: position,
    createStripeCheckoutSession,
    isUpgraded: isUpgraded,
    onMinimize,
    onError: onError,
  };

  const daysProps = {
    days: days,
    position: position,
    createStripeCheckoutSession,
    isUpgraded: isUpgraded,
    onError: onError,
  };

  return expanded ? <ExpandedView {...expandedProps} /> : <DaysView {...daysProps} />;
};
