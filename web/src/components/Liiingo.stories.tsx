import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React from 'react';
import { LiiingoTriStateToggle, LiiingoTriStateToggleProps } from './AppEditor/LiiingoTriStateToggle';
import { ShareButton, ShareButtonProps } from './AppEditor/ShareButton';
import { LiiingoMenu, LiiingoMenuProps } from './Dashboard/CardComponents/Menu/LiiingoMenu';
import { LiiingoMenuItem, LiiingoMenuItemProps } from './Dashboard/CardComponents/Menu/LiiingoMenuItem';
import { LiiingoDeleteDialog, LiiingoDeleteDialogProps } from './LiiingoDeleteDialog';
import { LiiingoDialog, LiiingoDialogProps } from './LiiingoDialog';
import { LiiingoDismissableTip, LiiingoDismissableTipProps } from './LiiingoDismissableTip';
import { LiiingoFailureSnackbar, LiiingoFailureSnackbarProps } from './LiiingoFailureSnackbar';
import { LiiingoSuccessSnackbar, LiiingoSuccessSnackbarProps } from './LiiingoSuccessSnackbar';
import { LiiingoTempDrawer, LiiingoTempDrawerProps } from './LiiingoTempDrawer';
import { LiiingoTooltip, LiiingoTooltipProps } from './LiiingoTooltip';
import { LiiingoWarning, LiiingoWarningProps } from './LiiingoWarning';

const CenteredBox: React.FC = (props) => {
  const { children } = { ...props };
  return (
    <Box
      style={{
        display: 'flex',
        width: '100%',
        height: 500,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
};

export default {
  component: LiiingoTooltip,
  title: 'Liiingo Custom Components',
  excludeStories: [],
  decorators: [
    (Story: React.FunctionComponent) => (
      <CenteredBox>
        <Story />
      </CenteredBox>
    ),
  ],
};

const TooltipTemplate = (args: LiiingoTooltipProps) => (
  <LiiingoTooltip {...args}>
    <Button>Sample Content</Button>
  </LiiingoTooltip>
);
export const Tooltip = TooltipTemplate.bind({});
Tooltip.args = {
  message: 'Liiingo Tooltip',
};

const TriToggleTemplate = (args: LiiingoTriStateToggleProps) => <LiiingoTriStateToggle {...args} />;
export const TriStateToggle = TriToggleTemplate.bind({});
TriStateToggle.args = {
  topicId: '',
  status: 1,
  hidePageTip: () => {},
  incognitoPageTip: () => {},
  updateTopicOptions: (payload) => {},
};

const Share = (args: ShareButtonProps) => <ShareButton {...args} />;
export const ShareStory = Share.bind({});
ShareStory.args = {
  topicId: '',
  initialShareStatus: true,
  sharePage: (enabled) => {},
};

const WarningTemplate = (args: LiiingoWarningProps) => <LiiingoWarning {...args} />;
export const Warning = WarningTemplate.bind({});
Warning.args = {
  message: 'Liiingo Warning',
};

const DialogTemplate = (args: LiiingoDialogProps) => <LiiingoDialog {...args} />;
export const Dialog = DialogTemplate.bind({});
Dialog.args = {
  open: true,
  title: 'Liiingo Dialog',
  titleVariant: 'dark',
  handleClose: () => {},
  actions: (
    <>
      <Button>Cancel</Button>
      <Button>Save</Button>
    </>
  ),
};

const DeleteDialogTemplate = (args: LiiingoDeleteDialogProps) => <LiiingoDeleteDialog {...args} />;
export const DeleteDialog = DeleteDialogTemplate.bind({});
DeleteDialog.args = {
  open: true,
  title: 'Liiingo Delete Dialog',
  id: 'TEST',
  firstLine: 'First Line of Message',
  secondLine: 'Second Line of Message',
  handleDelete: () => {},
  handleClose: () => {},
};

const MenuTemplate = (args: LiiingoMenuProps) => <LiiingoMenu {...args} />;
export const Menu = MenuTemplate.bind({});
Menu.args = {
  setAnchor: (e) => {},
};

const MenuItemTemplate = (args: LiiingoMenuItemProps) => <LiiingoMenuItem {...args} />;
export const MenuItem = MenuItemTemplate.bind({});
MenuItem.args = {
  text: 'Liiingo Menu Item',
  setAnchor: (e) => {},
};

const DismissableTipTemplate = (args: LiiingoDismissableTipProps) => (
  <LiiingoDismissableTip {...args}>Liiingo Dismissable Tip</LiiingoDismissableTip>
);
export const DismissableTip = DismissableTipTemplate.bind({});
DismissableTip.args = {
  name: 'Testing',
};

const SuccessSnackbarTemplate = (args: LiiingoSuccessSnackbarProps) => <LiiingoSuccessSnackbar {...args} />;
export const SuccessSnackbar = SuccessSnackbarTemplate.bind({});
SuccessSnackbar.args = {
  open: true,
  text: 'Liiingo Success Snackbar',
};

const FailureSnackbarTemplate = (args: LiiingoFailureSnackbarProps) => <LiiingoFailureSnackbar {...args} />;
export const FailureSnackbar = FailureSnackbarTemplate.bind({});
FailureSnackbar.args = {
  open: true,
  text: 'Liiingo Failure Snackbar',
};

const TempDrawerTemplate = (args: LiiingoTempDrawerProps) => <LiiingoTempDrawer {...args} />;
export const TempDrawer = TempDrawerTemplate.bind({});
TempDrawer.args = {
  open: true,
  setOpen: () => {},
  title: 'Liiingo Temp Drawer',
};
