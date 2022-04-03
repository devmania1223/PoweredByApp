import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { colors } from '../theme/palette';
import { LiiingoDialog } from './LiiingoDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deleteButton: {
      backgroundColor: colors.redLight,
      color: colors.redDark,
      '&:hover': {
        backgroundColor: colors.redDark,
        color: colors.pureWhite,
      },
    },
    actionBox: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 15,
    },
    content: {
      marginLeft: 25,
    },
    dismissText: {
      color: colors.grayDark,
    },
  })
);

export type LiiingoDeleteDialogProps = {
  open: boolean;
  id: string;
  title: string;
  firstLine: string;
  secondLine?: string;
  handleDelete: () => void;
  handleClose: () => void;
};

export const LiiingoDeleteDialog = (props: LiiingoDeleteDialogProps) => {
  const { open, title, id, firstLine, secondLine, handleDelete, handleClose } = { ...props };
  const [hide, setHide] = useState(false);
  const classes = useStyles();

  return (
    <LiiingoDialog
      titleVariant="light"
      open={open}
      title={title}
      handleClose={handleClose}
      actions={
        <>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            className={classes.deleteButton}
            onClick={() => {
              if (hide) {
                localStorage.setItem(id, 'true');
              }
              handleDelete();
              handleClose();
            }}
          >
            Delete
          </Button>
        </>
      }
    >
      <Typography variant="body2" className={classes.content}>
        {firstLine}
      </Typography>
      <Typography variant="body2" className={classes.content}>
        {secondLine}
      </Typography>
      <Box className={classes.actionBox}>
        <Checkbox
          color="primary"
          onClick={() => {
            setHide(!hide);
          }}
        />
        <Typography variant="body2" className={classes.dismissText}>
          Don't ask me this again.
        </Typography>
      </Box>
    </LiiingoDialog>
  );
};
