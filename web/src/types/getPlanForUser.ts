/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPlanForUser
// ====================================================

export interface getPlanForUser_user {
  __typename: "User";
  planId: any | null;
  billing: string | null;
}

export interface getPlanForUser {
  user: getPlanForUser_user | null;
}

export interface getPlanForUserVariables {
  sub: string;
}
