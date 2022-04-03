import React from 'react';
import { Address, AddressProps } from './Address';

export default {
  component: Address,
  title: 'Address',
  excludeStories: [],
  argTypes: {},
};

const Template = (args: AddressProps) => <Address {...args} />;

export const TwoLineAddress = () =>
  Template({
    address: {
      thoroughfare: '12345 N. Fork Rd.',
      locality: 'Boise',
      administrativeArea: 'ID',
      subAdministrativeArea: '',
      country: 'US',
      premise: '',
      postalCode: '83713',
      __typename: 'OrganizationAddress',
    },
  });

// export const ThreeLineAddress = Template.bind({});
// ThreeLineAddress.args = {
//   address: {
//     thoroughfare: '12345 N. Fork Rd.',
//     premise: 'Apt 12D',
//     locality: 'Boise',
//     administrativeArea: 'ID',
//     postalCode: '83713',
//   },
// };

// export const WithCustomTypography = Template.bind({});
// WithCustomTypography.args = {
//   address: {
//     thoroughfare: '12345 N. Fork Rd.',
//     locality: 'Boise',
//     administrativeArea: 'ID',
//     postalCode: '83713',
//   },
//   typographyProps: {
//     variant: 'h2',
//     display: 'block',
//   },
// };
