import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CloseIcon from '@material-ui/icons/Close';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { colors } from '../theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      margin: 8,
      backgroundColor: colors.hotPurpleAccent20,
    },
    icon: {
      color: colors.hotPurpleAccent,
    },
    fixed: {
      position: 'fixed',
      bottom: 40,
      right: 40,
      zIndex: 10000,
    },
  })
);

export type LiiingoDismissableTipProps = {
  name: string;
  fixed?: boolean;
  onClose?: () => void;
};

const defaultProps = {
  fixed: false,
  onClose: () => {},
};

export const LiiingoDismissableTip: React.FC<LiiingoDismissableTipProps> = (props) => {
  const { children, name, fixed, onClose } = { ...defaultProps, ...props };
  const [showAlert, setShowAlert] = useState(!localStorage.getItem(name));
  const classes = useStyles();

  const handleClose = () => {
    localStorage.setItem(name, 'true');
    onClose();
    setShowAlert(false);
  };

  const component = showAlert ? (
    <Alert
      className={classes.alert}
      icon={<EmojiObjectsIcon className={classes.icon} />}
      action={
        <IconButton
          onClick={() => {
            handleClose();
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      {children}
    </Alert>
  ) : null;

  return fixed ? <div className={classes.fixed}>{component}</div> : component;
};
