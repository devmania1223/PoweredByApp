/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: register
// ====================================================

export interface register_register {
  __typename: "RegisterResponse";
  sessionId: string | null;
}

export interface register {
  register: register_register | null;
}

export interface registerVariables {
  organizationId: string;
  onboardingRoute: string;
  referrer?: string | null;
  termsOfService: boolean;
}
