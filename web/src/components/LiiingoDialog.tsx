import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { colors } from '../theme/palette';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialog: {
      width: 500,
      maxHeight: 400,
    },
    closeIconDark: {
      color: colors.pureWhite,
    },
    closeIconLight: {},
    titleDark: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexGrow: 1,
      color: colors.pureWhite,
    },
    titleContainerDark: {
      backgroundColor: colors.grayDark,
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
    },
    titleLight: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexGrow: 1,
    },
    titleContainerLight: {
      paddingTop: 0,
      paddingBottom: 0,
      marginBottom: 0,
    },
    dialogActions: {
      maxWidth: 500,
      maxHeight: 52,
      backgroundColor: colors.grayLight5,
    },
    content: {
      width: 351,
      height: 300,
      marginTop: 15,
      marginLeft: 5,
      marginRight: 5,
    },
    dialogContent: {
      padding: 0,
    },
  })
);

export type LiiingoDialogProps = {
  open: boolean;
  title: string;
  titleVariant?: 'light' | 'dark';
  actions?: React.ReactNode;
  handleClose: () => void;
};

export const LiiingoDialog: React.FC<LiiingoDialogProps> = (props) => {
  const { children, open, title, titleVariant, actions, handleClose } = { ...props };
  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} open={open} disableEnforceFocus>
      <Box className={classes.dialog}>
        <DialogTitle className={titleVariant === 'light' ? classes.titleContainerLight : classes.titleContainerDark}>
          <Typography
            variant={titleVariant === 'light' ? 'subtitle1' : 'h5'}
            className={titleVariant === 'light' ? classes.titleLight : classes.titleDark}
          >
            {title}
            <IconButton onClick={handleClose}>
              <CloseIcon
                fontSize="small"
                className={titleVariant === 'light' ? classes.closeIconLight : classes.closeIconDark}
              />
            </IconButton>
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>{children}</DialogContent>
        <DialogActions className={classes.dialogActions}>{actions ?? null}</DialogActions>
      </Box>
    </Dialog>
  );
};
