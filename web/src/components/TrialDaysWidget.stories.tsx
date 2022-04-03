import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { SUBSCRIPTION_QUERY } from '../services/schema';
import { DaysView, DaysViewProps } from './TrialDays/DaysView';
import { ExpandedView, ExpandedViewProps } from './TrialDays/ExpandedView';
import { TrialDaysUI, TrialDaysUIProps } from './TrialDays/TrialDaysUI';
import TrialDaysWidget, { TrialDaysWidgetProps } from './TrialDays/TrialDaysWidget';

const apolloMocks = [
  {
    request: { query: SUBSCRIPTION_QUERY },
    result: {
      data: {
        subscription: {
          id: 'sub_JOUJz15bigqYzL',
          trialStart: '1619731405',
          status: 'trialing',
          startDate: 1619731405,
          daysUntilDue: null,
          __typename: 'getSubscriptionResponse',
          //trialEnd: `${Math.floor(Date.now()) / 1000 + 100000}`, // 1 Day Left
          trialEnd: `${Math.floor(Date.now()) / 1000 + 900000}`, // 10 Days Left
        },
        customerPaymentMethod: null, // Not upgraded
        /*
        customerPaymentMethod: {
          object: 'payment_methods',
        }, // Upgraded
        */
      },
    },
  },
];

export default {
  component: TrialDaysWidget,
  title: 'Trial Days Widget',
  excludeStories: [],
  decorators: [
    (Story: React.FunctionComponent) => (
      <MockedProvider mocks={apolloMocks} addTypename={false}>
        <Story />
      </MockedProvider>
    ),
  ],
};

const mockStripeCheckout = [
  () => {},
  {
    loading: false,
    error: false,
  },
];

const Template = (args: TrialDaysWidgetProps) => <TrialDaysWidget {...args} />;
export const Default = Template.bind({});
Default.args = {};

const UITemplate = (args: TrialDaysUIProps) => <TrialDaysUI {...args} />;
export const UI = UITemplate.bind({});
UI.args = {
  isExpanded: false,
  isUpgraded: false,
  days: 7,
  position: { vertical: 'bottom', horizontal: 'right' },
  createStripeCheckoutSession: mockStripeCheckout,
} as TrialDaysUIProps;

const DaysTemplate = (args: DaysViewProps) => <DaysView {...args} />;
export const Days = DaysTemplate.bind({});
Days.args = {
  position: { vertical: 'bottom', horizontal: 'right' },
  days: 7,
  createStripeCheckoutSession: mockStripeCheckout,
} as DaysViewProps;

const ExpandedTemplate = (args: ExpandedViewProps) => <ExpandedView {...args} />;
export const Expanded = ExpandedTemplate.bind({});
Expanded.args = {
  position: { vertical: 'bottom', horizontal: 'right' },
  createStripeCheckoutSession: mockStripeCheckout,
  days: 7,
} as ExpandedViewProps;
