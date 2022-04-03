import React from 'react';
import { LoginForm, Props as LoginFormProps } from './LoginForm';

export default {
  component: LoginForm,
  title: 'LoginForm',
  excludeStories: [],
  argTypes: {},
};

const Template = (args: LoginFormProps) => <LoginForm {...args} />;

export const Successful = () =>
  Template({
    email: 'valid.vladimir@example.com',
  });

/**
 * TODO: This story should demonstrate how the form behaves when
 *       an invalid username/password combo is submitted
 */

export const BadPassword = () =>
  Template({
    email: 'eric86@example.com',
  });
