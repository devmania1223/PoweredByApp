import MenuItem from '@material-ui/core/MenuItem';
import { Theme } from '@material-ui/core/styles/createTheme';

import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuItem: {
      justifyContent: 'flex-start',
    },
  })
);

export type LiiingoMenuItemProps = {
  text: string;
  setAnchor?: (anchor) => void;
  handleClick?: () => void;
  disabled?: boolean;
};

const defaultProps = {
  setAnchor: (anchor) => {},
  handleClick: () => {},
  disabled: false,
};

export const LiiingoMenuItem = React.forwardRef((props: LiiingoMenuItemProps, ref) => {
  const { text, setAnchor, handleClick, disabled } = { ...defaultProps, ...props };
  const classes = useStyles();

  const onClick = () => {
    setAnchor(null);
    handleClick();
  };

  return (
    <MenuItem disabled={disabled} className={classes.menuItem} onClick={onClick}>
      <Typography variant="body2">{text}</Typography>
    </MenuItem>
  );
});
