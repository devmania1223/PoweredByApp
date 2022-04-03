import Snackbar from '@material-ui/core/Snackbar';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Alert, { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';
import { colors } from '../theme/palette';
import { drawerWidth } from './AppEditor/LiiingoDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px - ${theme.spacing(2)}px)`,
      },
    },
    title: {
      color: colors.redDark,
    },
  })
);

export type ErrorBannerProps = {
  title: string;
  message: string;
  severity?: AlertProps['severity'];
  onClose?: () => void;
};
export const ErrorBanner = ({ title, message, onClose, severity = 'error' }: ErrorBannerProps) => {
  const classes = useStyles();
  return (
    <Snackbar open={!!message} onClose={onClose} className={classes.root}>
      <Alert severity={severity} onClose={onClose} elevation={3}>
        <Typography variant="button" className={classes.title}>
          {title}
        </Typography>
        {message}
      </Alert>
    </Snackbar>
  );
};
