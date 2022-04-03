/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createCheckoutSession
// ====================================================

export interface createCheckoutSession_createCheckoutSession {
  __typename: "CreateCheckoutSessionResponse";
  sessionId: string;
}

export interface createCheckoutSession {
  createCheckoutSession: createCheckoutSession_createCheckoutSession | null;
}

export interface createCheckoutSessionVariables {
  productCode?: string | null;
  route: string;
  successUrl: string;
  cancelUrl: string;
}
