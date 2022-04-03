/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: registerNewOrg
// ====================================================

export interface registerNewOrg_registerNewOrg {
  __typename: "RegisterResponse";
  sessionId: string | null;
}

export interface registerNewOrg {
  registerNewOrg: registerNewOrg_registerNewOrg | null;
}

export interface registerNewOrgVariables {
  onboardingRoute: string;
  referrer?: string | null;
  termsOfService: boolean;
  planId?: string | null;
  billing?: string | null;
}
