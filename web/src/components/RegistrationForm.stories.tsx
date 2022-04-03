import React from 'react';
import { GraphQLError } from 'graphql';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { RegistrationForm, Props as RegistrationFormProps } from './RegistrationForm';
import { REGISTER_MUTATION } from '../services/schema';
import { Elements } from '@stripe/react-stripe-js';

const mocks: MockedResponse[] = [
  {
    request: {
      query: REGISTER_MUTATION,
      variables: { email: 'valid.vladimir@example.com', password: 'goodPassword' },
    },
    result: {
      data: {
        login: 'this-is-a-valid-jwt-obviously',
      },
    },
  },
  {
    request: {
      query: REGISTER_MUTATION,
      variables: { email: 'eric86@example.com', password: 'badPassword' },
    },
    result: {
      errors: [new GraphQLError('User/Password invalid')],
      data: {
        login: null,
      },
    },
  },
];

export default {
  component: RegistrationForm,
  title: 'RegistrationForm',
  excludeStories: [],
  argTypes: {},
  decorators: [
    (Story: React.FunctionComponent) => (
      <MockedProvider mocks={mocks}>
        <Story />
      </MockedProvider>
    ),
  ],
};

const Template = (args: RegistrationFormProps) => {
  // const stripePromise = loadStripe('asdf');
  return (
    <Elements stripe={null}>
      <RegistrationForm {...args} />
    </Elements>
  );
};

const defaultProps: RegistrationFormProps = {
  onboardingRoute: 'example',
  organizationId: '1234567abcdefg',
};
export const Successful = () =>
  Template({
    ...defaultProps,
    email: 'valid.vladimir@example.com',
  });

/**
 * TODO: This story should demonstrate how the form behaves when
 *       an invalid username/password combo is submitted
 */
export const BadPassword = () =>
  Template({
    ...defaultProps,
    email: 'eric86@example.com@example.com',
  });
