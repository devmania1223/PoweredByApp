import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';
import { colors } from '../theme/palette';
import { LiiingoTooltip, LiiingoTooltipPosition } from './LiiingoTooltip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: colors.redDark,
    },
  })
);

export type LiiingoWarningProps = {
  message: string;
  placement?: LiiingoTooltipPosition;
};

export const LiiingoWarning = (props: LiiingoWarningProps) => {
  const classes = useStyles();
  const defaultProps: LiiingoWarningProps = {
    message: 'Warning',
    placement: 'bottom-start',
  };
  const { message, placement } = { ...defaultProps, ...props };

  return (
    <LiiingoTooltip placement={placement} message={message}>
      <ErrorIcon className={classes.icon} />
    </LiiingoTooltip>
  );
};
