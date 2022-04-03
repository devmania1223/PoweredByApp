import { Theme } from '@material-ui/core/styles/createTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { colors } from '../theme/palette';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: colors.redDark,
    },
    arrow: {
      color: colors.grayDark,
    },
    tooltip: {
      backgroundColor: colors.grayDark,
      textAlign: 'center',
    },
    msg: {
      color: colors.pureWhite,
    },
  })
);
export type LiiingoTooltipPosition =
  | 'bottom'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom-end'
  | 'bottom-start'
  | 'left-end'
  | 'left-start'
  | 'right-end'
  | 'right-start'
  | 'top-end'
  | 'top-start';
export type LiiingoTooltipProps = {
  message: string;
  placement?: LiiingoTooltipPosition;
  delay?: number;
  show?: boolean;
};

const defaultProps: LiiingoTooltipProps = {
  message: 'Warning',
  placement: 'bottom-start',
  delay: 100, //milliseconds 1000 ms = 1 sec
  show: true,
};

export const LiiingoTooltip: React.FC<LiiingoTooltipProps> = (props) => {
  const classes = useStyles();

  const { children, message, placement, delay, show } = { ...defaultProps, ...props };
  const [open, setOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(0);

  const handleClose = () => {
    setOpen(false);
    clearTimeout(timeoutId);
  };

  const preparedMsg = (
    <Typography variant="body2" className={classes.msg}>
      {message}
    </Typography>
  );

  return show ? (
    <Tooltip
      arrow
      open={open}
      placement={placement}
      title={preparedMsg}
      classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
    >
      <div
        onMouseEnter={() => {
          const id = window.setTimeout(() => setOpen(true), delay);
          setTimeoutId(id);
        }}
        onMouseLeave={handleClose}
        onClick={handleClose}
      >
        {children}
      </div>
    </Tooltip>
  ) : (
    <div>{children}</div>
  );
};
