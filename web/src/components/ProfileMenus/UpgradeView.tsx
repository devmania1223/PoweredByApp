import { ApolloError } from '@apollo/client';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Alert from '@material-ui/lab/Alert';
import { colors } from '../../theme/palette';
const useStyles = makeStyles({
  widgetAlarm: {
    color: colors.blueDark,
    margin: '0 10px 0 0',
    height: '24px',
    width: '24px',
  },
  widgetCheck: {
    color: colors.greenDark,
    borderRadius: '50%',
    margin: '0 10px 0 0',
    height: '24px',
    width: '24px',
  },
  messageLinkButton: {
    color: colors.blueDark,
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

  alert: {
    backgroundColor: colors.pureWhite,
    boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.2)',
    border: '1px solid #6DB554',
  },
  snackBar: {
    marginTop: 40,
  },
});

const generateTitle = (className) => {
  return <Typography className={className}>Your account is upgraded!</Typography>;
};

const generateIcon = (classes) => {
  return <CheckCircle className={classes.widgetCheck} />;
};

export type UpgradeViewProps = {
  position?: SnackbarOrigin;
  onError?: (error: string | ApolloError) => void;
};

export const UpgradeView = (props: UpgradeViewProps) => {
  const { position } = { ...props };
  const classes = useStyles();

  return (
    <Snackbar open={true} className={classes.snackBar} anchorOrigin={position}>
      <Alert className={classes.alert} icon={generateIcon(classes)} variant="outlined" severity="info">
        {generateTitle(classes.subtitle)}
      </Alert>
    </Snackbar>
  );
};
