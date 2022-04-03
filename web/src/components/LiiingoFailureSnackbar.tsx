import Box from '@material-ui/core/Box';
import Portal from '@material-ui/core/Portal';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';
import { colors } from '../theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    snackbar: {
      borderWidth: 1,
      borderRadius: 6,
      borderColor: colors.redDark,
      borderStyle: 'solid',
      backgroundColor: colors.pureWhite,
      boxShadow: '0px 2px 8px 0px rgba(0,0,0,0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      height: 42,
    },
    icon: {
      color: colors.redDark,
      marginRight: 15,
    },
  })
);

export type LiiingoFailureSnackbarProps = {
  open: boolean;
  text: string;
  position?: SnackbarOrigin;
  autoHide?: number;
  onClose: (event?, reason?) => void;
};

const defaultPosition: SnackbarOrigin = {
  vertical: 'top',
  horizontal: 'right',
};

const defaultProps = {
  open: false,
  position: defaultPosition,
  autoHide: 4000,
};

export const LiiingoFailureSnackbar = (props: LiiingoFailureSnackbarProps) => {
  const { open, text, position, autoHide, onClose } = { ...defaultProps, ...props };
  const classes = useStyles();

  return (
    <Portal>
      <Snackbar open={open} anchorOrigin={position} autoHideDuration={autoHide} onClose={onClose}>
        <Box className={classes.snackbar}>
          <ErrorIcon className={classes.icon} />
          <Typography variant="body2">{text}</Typography>
        </Box>
      </Snackbar>
    </Portal>
  );
};
