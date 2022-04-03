import Container from '@material-ui/core/Container';
import React from 'react';
import { EditCard, EditCardProps } from './EditCard';
import { NotifyCard, NotifyCardProps } from './NotifyCard';
import { QRCard, QRCardProps } from './QRCard';
import { Engagement, EngagementProps } from '../ProfileMenus/Engagement';
import { LiiingoTempDrawer, LiiingoTempDrawerProps } from '../LiiingoTempDrawer';
import Typography from '@material-ui/core/Typography';
import { QREditor, QREditorProps } from './QREditor/QREditor';
import { QRDialog, QRDialogProps } from './QREditor/QRDialog';

export default {
  component: EditCard,
  title: 'Dashboard',
  excludeStories: [],
  decorators: [],
};

const props: EngagementProps = {
  loadingLocation: false,
  loadingTopic: false,
  selectedLocation: null,
  selectedTopic: null,
  qrZipPath: '',
  qrLogo: '',
  saveQr: () => {},
  primaryColor: '',
  secondaryColor: '',
  orgId: '',
  topics: null,
  changeName: () => {},
  saveLocation: () => {},
  changeLogo: () => {},
  changePrimary: () => {},
  changeSecondary: () => {},
};

const DashboardTemplate = () => (
  <Container maxWidth="md">
    <Engagement {...props} />
  </Container>
);
export const Dashboard = DashboardTemplate.bind({});

const EditTemplate = (args: EditCardProps) => <EditCard {...args} />;
export const Edit = EditTemplate.bind({});
Edit.args = {
  location: {
    name: 'App Name',
    companyName: 'Company Name',
  },
};

const NotifyTemplate = (args: NotifyCardProps) => <NotifyCard {...args} />;
export const Notify = NotifyTemplate.bind({});
Notify.args = {};

const QRTemplate = (args: QRCardProps) => <QRCard {...args} />;
export const QR = QRTemplate.bind({});
QR.args = {};

const DrawerTemplate = (args: LiiingoTempDrawerProps) => (
  <LiiingoTempDrawer {...args}>
    <Typography variant="h1">~Hello</Typography>
    <Typography variant="h1">World~</Typography>
  </LiiingoTempDrawer>
);
export const TempDrawer = DrawerTemplate.bind({});
TempDrawer.args = {
  open: true,
  title: 'Title',
  setOpen: () => {},
};

const QREditorTemplate = (args: QREditorProps) => <QREditor {...args} />;
export const QREdit = QREditorTemplate.bind({});
QREdit.args = {
  open: true,
  setOpen: () => {},
};

const QRDialogTemplate = (args: QRDialogProps) => <QRDialog {...args} />;
export const QRDialogStory = QRDialogTemplate.bind({});
QRDialogStory.args = {
  open: true,
  onClose: () => {},
};
