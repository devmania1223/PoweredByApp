import React from 'react';
import { Throbber, ThrobberProps } from './Throbber';

export default {
  component: Throbber,
  title: 'Throbber',
  excludeStories: [],
  decorators: [],
};

const Template = (args: ThrobberProps) => <Throbber {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithOverlay = (args) => (
  <div style={{ position: 'relative', width: 200, height: 400, border: '2px solid black' }}>
    <Template {...args} />
    <div>Here's some sibling content in the div</div>
  </div>
);
WithOverlay.args = {
  withOverlay: true,
};
