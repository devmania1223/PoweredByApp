import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
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
    titleBox: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 10,
    },
    title: {
      marginLeft: 10,
      color: colors.grayLight,
    },
    closeButton: {
      marginRight: 10,
      color: colors.grayLight,
    },
  })
);

type AnchorOptions = 'left' | 'right' | 'top' | 'bottom';

export type LiiingoTempDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  anchor?: AnchorOptions;
  onClose?: () => void;
};

const defaultProps = {
  anchor: 'right' as AnchorOptions,
  onClose: () => {},
};

export const LiiingoTempDrawer: React.FC<LiiingoTempDrawerProps> = (props) => {
  const { children, anchor, title, open, onClose, setOpen } = { ...defaultProps, ...props };
  const classes = useStyles();

  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  return (
    <Drawer
      variant="temporary"
      anchor={anchor}
      open={open}
      onClose={handleClose}
      transitionDuration={{ appear: 500, enter: 500, exit: 500 }}
      disableEnforceFocus
    >
      <Box className={classes.titleBox}>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <IconButton className={classes.closeButton} size="small" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      {children}
    </Drawer>
  );
};
