import React from 'react';
import { LeftDrawer } from './LeftDrawer';
import { QrMenu, QrMenuProps } from './QrMenu';

export default {
  component: QrMenu,
  title: 'Qr Menu',
  excludeStories: [],
};

const Template = (args: QrMenuProps) => <LeftDrawer locationId={null} component={<QrMenu {...args} />} />;
export const Default = Template.bind({});
Default.args = {};
