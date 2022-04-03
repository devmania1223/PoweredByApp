/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: closeAccount
// ====================================================

export interface closeAccount_closeAccount {
  __typename: "UpdateOneUserPayload";
  /**
   * Document ID
   */
  recordId: any | null;
}

export interface closeAccount {
  closeAccount: closeAccount_closeAccount | null;
}

export interface closeAccountVariables {
  route: string;
}
