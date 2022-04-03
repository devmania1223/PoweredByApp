import React from 'react';
import { InfoLink, InfoLinkProps } from './InfoLink';

export default {
  component: InfoLink,
  title: 'InfoLink',
  excludeStories: [],
  argTypes: {},
};

const Template = (args: InfoLinkProps) => <InfoLink {...args}>Check Out This Link</InfoLink>;

export const Default = () =>
  Template({
    to: 'sign-up',
  });

export const ForgotPassword = () => <InfoLink to="forgot-password">Forgot Your Password?</InfoLink>;
