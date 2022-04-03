import TextField from '@material-ui/core/TextField';
import React from 'react';
import { LiiingoBadge, LiiingoBadgeProps } from './LiiingoBadge';

export default {
  component: LiiingoBadge,
  title: 'LiiingoBadge',
  excludeStories: [],
  decorators: [],
};

const BadgeTemplate = (args: LiiingoBadgeProps) => (
  <LiiingoBadge {...args}>
    <TextField value="Hover and Focus!" />
  </LiiingoBadge>
);
export const Badge = BadgeTemplate.bind({});
Badge.args = {};
