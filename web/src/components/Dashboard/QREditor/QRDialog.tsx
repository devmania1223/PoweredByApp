import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { CLOSED_QR_DIALOG } from '../../../util/constants';
import { FlatButton } from '../../Buttons/FlatButton';
import { LiiingoDialog } from '../../LiiingoDialog';

export type LinkDialogMenuOption = 'page' | 'web' | 'file' | 'email' | 'phone' | 'none';
export type ButtonLink = {
  invalid: boolean;
  web: string;
  email: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      width: 351,
      height: 300,
      marginTop: 15,
      marginLeft: 5,
      marginRight: 5,
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
    },
    actionBox: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 15,
    },
    text: {
      marginLeft: 25,
    },
  })
);

export type QRDialogProps = {
  open: boolean;
  onClose: () => void;
  closeDrawer: () => void;
};

export const QRDialog = (props: QRDialogProps) => {
  const { open, onClose, closeDrawer } = {
    ...props,
  };
  const classes = useStyles();
  const [hide, setHide] = useState(false);
  const handleClose = () => {
    /**
     * implement with redux
     * need to add conditional checking state for if
     * QR has been edited
     */
    if (hide) {
      localStorage.setItem(CLOSED_QR_DIALOG, 'true');
    }
    onClose();
  };

  return (
    <LiiingoDialog
      title="Leave This Page?"
      titleVariant="light"
      handleClose={handleClose}
      open={open}
      actions={
        <>
          <FlatButton
            onClick={() => {
              closeDrawer();
              handleClose();
            }}
          >
            Leave Without Saving
          </FlatButton>
          <FlatButton
            variant="contained"
            color="primary"
            type="submit"
            onClick={(e) => {
              /**
               * implement with redux
               * need to save
               */
              handleClose();
            }}
          >
            Continue Editing
          </FlatButton>
        </>
      }
    >
      <Box className={classes.box}>
        <Typography className={classes.text} variant="body2">
          It looks like you're in the middle of editing your QR Code. Are you sure you want to leave without saving your
          changes?
        </Typography>
        <Box className={classes.actionBox}>
          <Checkbox
            color="primary"
            onClick={() => {
              setHide(!hide);
            }}
          />
          <Typography variant="body2">Don't ask me this again.</Typography>
        </Box>
      </Box>
    </LiiingoDialog>
  );
};
