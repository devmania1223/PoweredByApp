/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSubscription
// ====================================================

export interface getSubscription_subscription {
  __typename: "getSubscriptionResponse";
  id: string;
  trialEnd: string | null;
  trialStart: string | null;
  status: string | null;
  startDate: number | null;
  daysUntilDue: number | null;
}

export interface getSubscription_customerPaymentMethod {
  __typename: "CustomerPaymentMethodResponse";
  object: string | null;
}

export interface getSubscription {
  subscription: getSubscription_subscription | null;
  customerPaymentMethod: getSubscription_customerPaymentMethod | null;
}
