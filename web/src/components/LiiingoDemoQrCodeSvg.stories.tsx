import React from 'react';
import { LiiingoDemoQrCodeSvg, LiiingoDemoQrCodeSvgProps } from './LiiingoDemoQrCodeSvg';

export default {
  component: LiiingoDemoQrCodeSvg,
  title: 'LiiingoDemoQrCodeSvg',
  argTypes: {
    primaryColor: {
      control: 'color',
    },
    secondaryColor: {
      control: 'color',
    },
  },
  excludeStories: [],
  decorators: [],
};

const Template = (args: LiiingoDemoQrCodeSvgProps) => <LiiingoDemoQrCodeSvg {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const CustomColors = Template.bind({});
CustomColors.args = {
  primaryColor: '#ff0000',
  secondaryColor: '#f0f000',
};

export const Resized = (args) => (
  <div style={{ width: 100, height: 100, border: '2px solid #ff0000' }}>
    <Template {...args} />
  </div>
);
