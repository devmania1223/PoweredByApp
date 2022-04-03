import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircleOutlined';
import AppIcon from '@material-ui/icons/InsertDriveFileOutlined';
import HelpOutline from '@material-ui/icons/HelpOutline';
import { AppBar, AppBarProps } from './Navigation/AppBar';
import { Nav } from './Navigation/Nav';
import { LeftNav, LeftNavProps, LeftNavMenuItem } from './Navigation/LeftNav';
import { AppContext } from '../context/AppContext';

const mockContext = {
  identity: {
    id: '123',
    firstName: 'Joe',
    lastName: 'Cool',
    organizationId: '1234abcd',
    email: 'joe@cool.com',
    username: 'jcool',
  },
};

const appBarItems = [
  {
    displayName: 'App',
    route: 'https://liiingo.com',
  },
  {
    displayName: 'Help',
    route: 'https://liiingo.com',
  },
  {
    displayName: 'Multilingual',
    route: 'https://liiingo.com',
  },
];

const menuItems: LeftNavMenuItem[] = [
  {
    route: '/profile/billing',
    displayName: 'Account Settings',
    icon: AccountCircleIcon,
    component: null,
  },
  {
    route: '/profile',
    displayName: 'My App',
    icon: AppIcon,
    component: null,
  },
];

const bottomMenuItems: LeftNavMenuItem[] = [
  {
    route: 'https://support.liiingo.com/helpdocs',
    displayName: 'Support',
    icon: HelpOutline,
    component: null,
  },
];

export default {
  component: Nav,
  title: 'Navigation',
  excludeStories: [],
  decorators: [
    (Story: React.FunctionComponent) => (
      <AppContext.Provider value={mockContext}>
        <Story />
      </AppContext.Provider>
    ),
  ],
};

const Template = (args: LeftNavProps) => <Nav {...args} />;
export const Default = Template.bind({});
Default.args = { menuItems, bottomMenuItems };

const AppBarTemplate = (args: AppBarProps) => <AppBar {...args} />;
export const AppBarOnly = AppBarTemplate.bind({});
AppBarOnly.args = {};

const AppBarItemsTemplate = (args: AppBarProps) => <AppBar {...args} />;
export const AppBarWithItems = AppBarItemsTemplate.bind({});
AppBarWithItems.args = {
  appBarItems: appBarItems,
};

const LeftNavTemplate = (args: LeftNavProps) => <LeftNav {...args} />;
export const LeftNavOnly = LeftNavTemplate.bind({});
LeftNavOnly.args = { menuItems, bottomMenuItems };
