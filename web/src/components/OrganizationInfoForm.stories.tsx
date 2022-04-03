import React from 'react';
import { OrganizationInfoForm, OrganizationInfoFormProps } from './OrganizationInfoForm';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ORGANIZATION_BY_ID_QUERY } from '../services/schema';
import { AppContext } from '../context/AppContext';

const apolloMocks = [
  {
    request: {
      query: GET_ORGANIZATION_BY_ID_QUERY,
      variables: {
        id: '5fdd3e02bae857014f4db844',
      },
    },
    result: {
      data: {
        organizationById: {
          _id: '5fdd3e02bae857014f4db844',
          name: null,
          address: {
            country: null,
            administrativeArea: null,
            subAdministrativeArea: null,
            locality: null,
            postalCode: null,
            thoroughfare: null,
            premise: null,
            __typename: 'OrganizationAddress',
          },
          email: null,
          phone: null,
          fax: null,
          organizationID: null,
          languages: [],
          whoIAm: null,
          taxID: null,
          website: null,
          appointmentInfo: null,
          vaccineAvailability: null,
          riskCategories: [],
          hours: [],
          active: true,
          stripeCustomerId: 'cus_Ib4i5HNMmvqn85',
          liiingoUrl: null,
          zipPath:
            'https://storage.googleapis.com/liiingo_dev/customQrs/df-resads-placeholder.zip?GoogleAccessId=liiingo-server@vernal-isotope-224117.iam.gserviceaccount.com&Expires=1608335474&Signature=cR0W17KYWkrZply7CRf7gZ5vEp36pyENCFu9jOjfGQop5J%2B9GzE576jZcLWtCpdM0tjV4%2Fo78VHn0s3e9r6lT0oagnfZ4TWk0QXhVm0Ab6nLv6OMZuqPmLtYW8knHISU5dfK15yowewddT1h7woZ6o4O7Xr9NfRRefu8%2BaOuZV5orFDDL3wK%2BL0IJuV2dqo9v%2FcOadiUvpxracR%2BvqwOqMCqupdTfm7T1TI%2BS2UML0Aj7lvE3rvZq2xbkiv9z8eEefckzrAqHClmzeGF%2F8szKtS6Pb4BmmepnNe2PExidjKXr8qTvP1MqZTnoZE4qhMTc%2BE8tG%2FMTO14cezixF5M6w%3D%3D',
          qrCode:
            'https://storage.googleapis.com/liiingo_dev/customQrs/564b5dc233ce09f913970da2e1c371f93gNsDNkAbXPjEHCsWDWW.png?GoogleAccessId=liiingo-server@vernal-isotope-224117.iam.gserviceaccount.com&Expires=1608335473&Signature=Vw2YWsBFsB2NUytgTccaI%2F%2BgEKAkM0%2BZoWs7O84SI2QAijco1OQKk9LlNYDX1Ly7RBzyBykkYD2V0sqYzYlhJxv27GS0bG61tBbkqXFgctTkxtUwFBSak8Xc3JtJPYo5n%2FJ96nNJ07Cup%2BNbSvfHvl8iGyTtcLMBzx40hzCTi1ty4OXLMGVf%2FcNUGLQqzLlROBgtMnv4TEyB4BO7OMzcZppNF8V4pgBfo2dPc0XWQdI8dvOoDscDAkHrF9Sgi9tHncmOyIvwI8CbXTscOafRd86yrCnRmx2Um07XAcqU7x%2By6fXsUBrXmABRqSFKTaoamAGTqj0BL1hlIAe521YCEg%3D%3D',
          updatedAt: '2020-12-18T23:40:51.218Z',
          createdAt: '2020-12-18T23:40:51.218Z',
          __typename: 'Organization',
        },
      },
    },
  },
];

const mockContext = {
  identity: {
    id: '123',
    firstName: 'Chester',
    lastName: 'Tester',
    organizationId: '12345abcde',
    email: 'chestertester@sharklasers.com',
    username: 'abcd',
  },
};

export default {
  component: OrganizationInfoForm,
  title: 'OrganizationInfoForm',
  excludeStories: [],
  argTypes: {
    onSubmit: {
      action: 'Form submitted',
    },
    onCancel: {
      action: 'Form cancelled',
    },
  },
  decorators: [
    (Story: React.FunctionComponent) => (
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <Story />
      </MockedProvider>
    ),
    (Story: React.FunctionComponent) => (
      <AppContext.Provider value={mockContext}>
        <Story />
      </AppContext.Provider>
    ),
  ],
};

const defaultProps: OrganizationInfoFormProps = {
  onSuccess: () => {},
  onCancel: () => {},
};
const Template = (args: OrganizationInfoFormProps) => <OrganizationInfoForm {...args} />;

export const Default = () => Template(defaultProps);
