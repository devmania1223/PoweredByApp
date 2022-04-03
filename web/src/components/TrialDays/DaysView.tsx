import { ApolloError, MutationTuple, OperationVariables } from '@apollo/client';
import { Button, createStyles, Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import WatchLater from '@material-ui/icons/WatchLater';
import React from 'react';
import { colors } from '../../theme/palette';
import { createCheckoutSession } from '../../types/createCheckoutSession';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    widgetButton: {
      border: `1px solid #4C6CDC`, // Use a color from the Theme once the theme has been added
      textTransform: 'none',
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.2)',
    },
    widgetButtonDisabled: {
      borderColor: '#4C6CDC',
      textTransform: 'none',
      pointerEvents: 'none',
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.2)',
    },
    widgetClock: {
      color: '#4C6CDC',
      margin: '0 10px 0 0',
      height: '24px',
      width: '24px',
    },
    widgetSpinner: {
      color: '#4C6CDC',
      margin: '0 10px 0 0',
    },
    tooltipWidth: {
      maxWidth: '350px',
    },
    snackbar: {
      marginRight: '75px',
      zIndex: 1199,
    },
    tooltipBody: {
      color: colors.pureWhite,
    },
  })
);

const generateText = (days) => {
  return days === 1 ? (
    <Typography variant="body1">{days} Day Left</Typography>
  ) : (
    <Typography variant="body1">{days} Days Left</Typography>
  );
};

const generateHoverMsg = (isUpgraded, days, tooltipBody) => {
  const dayMessage = days === 1 ? days + ' more day' : days + ' more days';

  return isUpgraded ? (
    <Typography variant="body2" className={tooltipBody}>
      Your account is upgraded, but you won't be billed until your trial period ends. Continue to enjoy Liiingo for free
      for {dayMessage} and manage your billing info from your profile at any time.
    </Typography>
  ) : (
    <Typography variant="body2" className={tooltipBody}>
      Click to upgrade.
    </Typography>
  );
};

export type DaysViewProps = {
  days?: number;
  position?: SnackbarOrigin;
  isUpgraded?: boolean;
  createStripeCheckoutSession: MutationTuple<createCheckoutSession, OperationVariables>;
  onError?: (error: string | ApolloError) => void;
};

export const DaysView = (props: DaysViewProps) => {
  const { days, isUpgraded, createStripeCheckoutSession, position } = { ...props };
  const classes = useStyles();
  const [createCheckoutSessionMutation, { loading }] = createStripeCheckoutSession;
  const handleClick = isUpgraded
    ? (e) => {}
    : (e) => {
        createCheckoutSessionMutation();
      };

  return (
    <Tooltip
      arrow
      placement={'left'}
      title={generateHoverMsg(isUpgraded, days, classes.tooltipBody)}
      classes={{ tooltip: classes.tooltipWidth }}
    >
      <Snackbar open={true} anchorOrigin={position} className={classes.snackbar}>
        <Button
          className={isUpgraded ? classes.widgetButtonDisabled : classes.widgetButton}
          variant="contained"
          onClick={handleClick}
        >
          {loading && (
            <Typography variant="body1">
              <CircularProgress className={classes.widgetSpinner} size={20} />
              Loading...
            </Typography>
          )}
          {!loading && <WatchLater className={classes.widgetClock} />}
          {!loading && generateText(days)}
        </Button>
      </Snackbar>
    </Tooltip>
  );
};
