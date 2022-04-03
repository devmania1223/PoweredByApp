import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React from 'react';
import MultilanguageDrawer from '../ML/MLDrawer';
import { SvgMultilanguage } from '../ProfileMenus';
import { Option } from './Option';
import { OptionGroup } from './OptionGroup';

export const SETTINGS_MENU = 'settings';

export type SettingsMenuProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const SettingsMenu = (props: SettingsMenuProps) => {
  const { open, setOpen } = { ...props };

  return (
    <OptionGroup title="Settings">
      <MultilanguageDrawer open={open} setOpen={setOpen} />
      <Option clickable icon={SvgMultilanguage} label="Multilingual" onClick={() => setOpen(true)} />
      <Option
        clickable
        icon={ExitToAppIcon}
        label="Go to Dashboard"
        onClick={() => window.open('profile/engagement', '_blank').focus()}
      />
    </OptionGroup>
  );
};
