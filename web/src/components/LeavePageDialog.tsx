import Box from '@material-ui/core/Box';
import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { FlatButton } from './Buttons';
import { LiiingoDialog } from './LiiingoDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      flexDirection: 'column',
    },
    text: {
      marginLeft: 25,
    },
  })
);

export type LeavePageDialogProps = {
  open: boolean;
  makeChange: (change: boolean) => void;
  saveContent: () => void;
  leaveWithoutSaving: () => void;
};

export const LeavePageDialog = (props: LeavePageDialogProps) => {
  const { open, makeChange, saveContent, leaveWithoutSaving } = {
    ...props,
  };
  const classes = useStyles();
  const history = useHistory();
  const [currentPath, setCurrentPath] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (open) {
      history.block((prompt) => {
        setCurrentPath(prompt.pathname + prompt.search);
        setShow(true);
        return 'true';
      });
    } else {
      history.block(() => {});
    }

    return () => {
      history.block(() => {});
    };
  }, [history, open]);

  const handleLeaveWithoutSave = () => {
    history.block(() => {});
    history.push(currentPath);
    makeChange(false);
    setShow(false);
    leaveWithoutSaving();
  };

  const handleSave = async () => {
    await saveContent();
    setShow(false);
    if (currentPath) {
      setTimeout(() => {
        history.block(() => {});
        history.push(currentPath);
      }, 10000);
    }
  };

  return show ? (
    <LiiingoDialog
      title="Leave This Page?"
      titleVariant="light"
      handleClose={() => setShow(false)}
      open={open}
      actions={
        <>
          <FlatButton onClick={handleLeaveWithoutSave}>Leave Without Saving</FlatButton>
          <FlatButton variant="contained" color="primary" type="submit" onClick={handleSave}>
            {`Save & Publish`}
          </FlatButton>
        </>
      }
    >
      <Box className={classes.box}>
        <Typography className={classes.text} variant="body2">
          It looks like you have changes that haven't been saved and published to your app. Leaving this page without
          saving will revert back to the previously saved content. Are you sure you want to leave without saving your
          changes?
        </Typography>
      </Box>
    </LiiingoDialog>
  ) : null;
};
