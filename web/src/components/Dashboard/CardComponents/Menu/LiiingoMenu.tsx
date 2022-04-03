import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import { Theme } from '@material-ui/core/styles/createTheme';

import makeStyles from '@material-ui/core/styles/makeStyles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { colors } from '../../../../theme/palette';

const useStyles = makeStyles<Theme, LiiingoMenuProps>({
  icon: (props) => ({
    color: colors.grayLight,
    '&:hover': {
      color: props.color === 'light' ? colors.tealAccent : colors.blueAccent,
    },
  }),
  button: (props) => ({
    '&:hover': {
      backgroundColor: props.color === 'light' ? colors.tealAccent20 : colors.blueAccent20,
    },
  }),
  menu: {
    padding: 0,
    backgroundColor: colors.pureWhite,
    filter: 'drop-shadow(0px 2px 8px rgba(24, 27, 32, 0.2))',
    borderRadius: 5,
  },
});

export type LiiingoMenuProps = {
  anchor: Element;
  setAnchor: (anchor) => void;
  name?: string;
  icon?: React.FunctionComponent<SvgIconProps>;
  color?: 'light' | 'dark';
  handleClose?: () => void;
};

const defaultProps: Partial<LiiingoMenuProps> = {
  icon: MoreVertIcon,
  color: 'light',
};

export const LiiingoMenu: React.FC<LiiingoMenuProps> = (props) => {
  const { children, anchor, setAnchor, icon: Icon, name, handleClose, color } = { ...defaultProps, ...props };
  const classes = useStyles({ anchor, setAnchor, icon: Icon, name, handleClose, color });

  const openMenu = (e) => {
    setAnchor(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchor(null);
  };

  return (
    <>
      <IconButton size="small" className={classes.button} onClick={openMenu}>
        <Icon className={classes.icon} />
      </IconButton>
      <Menu
        classes={{ paper: classes.menu }}
        id={name}
        anchorEl={anchor}
        keepMounted
        open={!!anchor}
        onClose={handleClose ?? closeMenu}
        elevation={1}
      >
        {children}
      </Menu>
    </>
  );
};
