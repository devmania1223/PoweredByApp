import { ApolloError, MutationTuple, OperationVariables } from '@apollo/client';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import WatchLater from '@material-ui/icons/WatchLater';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Alert from '@material-ui/lab/Alert';
import { createCheckoutSession } from '../../types/createCheckoutSession';

const useStyles = makeStyles({
  widgetAlarm: {
    color: '#4C6CDC',
    margin: '0 10px 0 0',
    height: '24px',
    width: '24px',
  },
  widgetCheck: {
    color: '#4C6CDC',
    borderRadius: '50%',
    margin: '0 10px 0 0',
    height: '24px',
    width: '24px',
  },
  messageLinkButton: {
    color: '#4C6CDC',
    cursor: 'pointer',
    background: 'none',
    margin: 0,
    padding: 0,
    border: 'none',
    font: 'Roboto',
    fontWeight: 700,
    fontSize: '14px',
  },
  subtitle: {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 500,
    fontSize: '16px',
  },
  expandedBodyNotUpgraded: {
    width: '258px',
  },
  expandedBodyUpgraded: {
    width: '268px',
  },
  alert: {
    backgroundColor: '#FFFFFF',
    marginBottom: '75px',
    boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.2)',
    zIndex: 1199,
  },
});

const generateText = (isUpgraded, days, classes, createCheckout) => {
  const dayMessage = days === 1 ? days + ' more day' : days + ' more days';

  return isUpgraded ? (
    <Typography variant="body2" className={classes.expandedBodyUpgraded}>
      Your account is upgraded, but you won't be billed until your trial period ends. Continue to enjoy Liiingo for free
      for {dayMessage} and manage your billing info from your profile at any time.
    </Typography>
  ) : (
    <Typography variant="body2" className={classes.expandedBodyNotUpgraded}>
      Your Liiingo trial is about to end.
      <button className={classes.messageLinkButton} onClick={createCheckout}>
        {' '}
        Upgrade now
      </button>{' '}
      to make sure you keep everything running without interruption after your trial ends.
    </Typography>
  );
};

const generateTitle = (isUpgraded, className) => {
  return isUpgraded ? (
    <Typography className={className}>Account Successfully Upgraded</Typography>
  ) : (
    <Typography className={className}>Your Free Trial Is Ending Soon</Typography>
  );
};

const generateIcon = (isUpgraded, classes) => {
  return isUpgraded ? <CheckCircle className={classes.widgetCheck} /> : <WatchLater className={classes.widgetAlarm} />;
};

export type ExpandedViewProps = {
  days?: number;
  position?: SnackbarOrigin;
  createStripeCheckoutSession: MutationTuple<createCheckoutSession, OperationVariables>;
  isUpgraded?: boolean;
  onError?: (error: string | ApolloError) => void;
  onMinimize: (e) => void;
};

export const ExpandedView = (props: ExpandedViewProps) => {
  const { days, isUpgraded, createStripeCheckoutSession, onMinimize, position } = { ...props };
  const classes = useStyles();
  const [createCheckoutSessionMutation] = createStripeCheckoutSession;
  const checkoutSession = (e) => {
    createCheckoutSessionMutation();
  };

  return (
    <Snackbar open={true} onClose={onMinimize} anchorOrigin={position}>
      <Alert
        className={classes.alert}
        icon={generateIcon(isUpgraded, classes)}
        variant="outlined"
        severity="info"
        onClose={onMinimize}
      >
        {generateTitle(isUpgraded, classes.subtitle)}
        {generateText(isUpgraded, days, classes, checkoutSession)}
      </Alert>
    </Snackbar>
  );
};
