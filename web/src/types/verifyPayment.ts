/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: verifyPayment
// ====================================================

export interface verifyPayment_verifyPayment {
  __typename: "VerifyPaymentResponse";
  verified: boolean;
}

export interface verifyPayment {
  verifyPayment: verifyPayment_verifyPayment | null;
}

export interface verifyPaymentVariables {
  checkoutSessionId: string;
  isUpgrade: boolean;
}
