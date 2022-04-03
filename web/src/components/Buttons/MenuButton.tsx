import React from 'react';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/IconButton';
import { theme } from '../../theme';

export interface MenuButtonProps extends IconButtonProps {
  width?: number;
  paddingX?: number;
}
export const MenuButton = (props: MenuButtonProps) => {
  const { width = 60, paddingX = 10, ...rest } = props;

  const styles = {
    avatar: {
      colorDefault: {
        backgroundColor: theme.palette.background.paper,
      },
    },
    iconContainer: {
      padding: 0,
    },
    iconContainerLabel: {
      maxWidth: width,
      paddingLeft: paddingX,
      paddingRight: paddingX,
      borderRadius: 0,
    },
  };

  return (
    <IconButton style={{ ...styles.iconContainerLabel }} component={Button} {...rest}>
      <MenuIcon />
    </IconButton>
  );
};
