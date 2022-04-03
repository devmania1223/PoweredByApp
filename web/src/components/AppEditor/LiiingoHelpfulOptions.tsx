import { makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpIcon from '@material-ui/icons/HelpOutline';
import React from 'react';
import { useLogout } from '../../hooks/useLogout';
import { Option } from '../SettingsMenuOptions/Option';
import { drawerCollapsedWidth } from './LiiingoDrawer';

const useStyles = makeStyles<Theme, LiiingoHelpfulOptionsProps>({
  optionBox: (props) => ({
    paddingLeft: props.gutterLeft ? drawerCollapsedWidth : null,
  }),
});

export type LiiingoHelpfulOptionsProps = {
  gutterLeft?: boolean;
};

const defaultProps = {
  gutterLeft: true,
};

export const LiiingoHelpfulOptions = (props: LiiingoHelpfulOptionsProps) => {
  const { gutterLeft } = {
    ...defaultProps,
    ...props,
  };

  const classes = useStyles({ gutterLeft });
  const logout = useLogout();

  return (
    <Box className={classes.optionBox}>
      <Option
        clickable
        icon={HelpIcon}
        iconVariant="light"
        label="Support"
        onClick={() =>
          (window.location.href =
            'mailto:support@liiingo.com?subject=Liiingo Support Message&body=What can we help you with?')
        }
      />
      <Option clickable icon={ExitToAppIcon} iconVariant="light" label="Log Out" onClick={logout} />
    </Box>
  );
};
