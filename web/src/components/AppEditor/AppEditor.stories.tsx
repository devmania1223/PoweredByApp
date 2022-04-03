import React from 'react';
import { AppBar } from '../Navigation/AppBar';
import { LeftDrawer, LeftDrawerProps } from './LeftDrawer';
import { RightDrawer, RightDrawerProps } from './RightDrawer';

const mockMenuItems = [
  {
    locationId: 'locationId_0',
    displayName: 'My App',
  },
  {
    locationId: 'locationId_1',
    displayName: 'Second Page',
  },
];

export default {
  component: LeftDrawer,
  title: 'App Editor Tools',
  excludeStories: [],
  decorators: [],
};

const LeftTemplate = (args: LeftDrawerProps) => <LeftDrawer {...args} />;
export const Left = LeftTemplate.bind({});
Left.args = {
  menuItems: mockMenuItems,
};

const RightTemplate = (args: RightDrawerProps) => <RightDrawer {...args} />;
export const Right = RightTemplate.bind({});
Right.args = {
  isExpanded: true,
};

const FullTemplate = (args: LeftDrawerProps) => (
  <>
    <AppBar /> <LeftDrawer {...args} /> <RightDrawer />
  </>
);
export const Full = FullTemplate.bind({});
Full.args = {
  isExpanded: true,
  menuItems: mockMenuItems,
};
