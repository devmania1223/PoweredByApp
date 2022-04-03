import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { AppContext, AppContextType } from '../../context/AppContext';
import { colors } from '../../theme/palette';
import { IPhoneViewer, IPhoneViewerProps } from './IPhoneViewer';
import { PhoneViewer, PhoneViewerProps } from './PhoneViewer';

const mockContext: AppContextType = {
  identity: {
    id: '123',
    firstName: 'Chester',
    lastName: 'Tester',
    organizationId: '1234567abcdefg',
    email: 'chestertester@sharklasers.com',
    username: 'abcd',
  },
  accessToken: '',
  refreshToken: '',
  refreshAppContext: () => {},
};

export default {
  component: PhoneViewer,
  title: 'PhoneViewer',
  excludeStories: [],
  decorators: [
    (Story: React.FunctionComponent) => (
      <AppContext.Provider value={mockContext}>
        <Story />
      </AppContext.Provider>
    ),
  ],
};

const Template = (args: PhoneViewerProps) => (
  <div style={{ display: 'flex' }}>
    <PhoneViewer {...args}>
      <Box>This is some content</Box>
      <Typography variant="h2">Sup DAWGS</Typography>
    </PhoneViewer>
  </div>
);

export const Empty = () => Template({});

const NewTemplate = (args: IPhoneViewerProps) => (
  <div style={{ display: 'flex' }}>
    <IPhoneViewer {...args}>
      <Box>This is some content</Box>
      <Typography variant="h2">Sup DAWGS</Typography>
    </IPhoneViewer>
  </div>
);
export const New = () =>
  NewTemplate({
    onFocusContent: (id: string) => {},
    isFocused: false,
    logoUrl:
      'https://poweredby-dev-public.s3.us-west-2.amazonaws.com/6092d84fb9e6a40212e4402e/topicBackgroundImage.jpeg?hash=e0aef180-b4d4-11eb-856f-79f2b39474fd',
    appName: 'Test App',
  });

const LongTemplate = (args: IPhoneViewerProps) => (
  <div style={{ display: 'flex' }}>
    <IPhoneViewer {...args}>
      <Box
        display="flex"
        flexDirection="column"
        height={4500}
        style={{ backgroundImage: `linear-gradient(${colors.pureWhite}, ${colors.purpleAccent})` }}
      >
        <Typography variant="h1">This</Typography>
        <Typography variant="h1">is</Typography>
        <Typography variant="h1">a</Typography>
        <Typography variant="h1">BOATLOAD</Typography>
        <Typography variant="h1">of</Typography>
        <Typography variant="h1">content</Typography>
        <Typography variant="h1">to</Typography>
        <Typography variant="h1">show</Typography>
        <Typography variant="h1">the</Typography>
        <Typography variant="h1">iPhone</Typography>
        <Typography variant="h1">view</Typography>
        <Typography variant="h1">grows</Typography>
        <Typography variant="h1">vertically</Typography>
      </Box>
    </IPhoneViewer>
  </div>
);
export const LongContent = () =>
  LongTemplate({
    onFocusContent: (id: string) => {},
    isFocused: false,
    logoUrl:
      'https://poweredby-dev-public.s3.us-west-2.amazonaws.com/6092d84fb9e6a40212e4402e/topicBackgroundImage.jpeg?hash=e0aef180-b4d4-11eb-856f-79f2b39474fd',
    appName: 'Test App',
  });
