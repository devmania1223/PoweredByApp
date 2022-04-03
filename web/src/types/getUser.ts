/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterFindOneUserInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getUser
// ====================================================

export interface getUser_user_organization_users {
  __typename: "User";
  sub: string;
  email: string;
}

export interface getUser_user_organization {
  __typename: "Organization";
  users: getUser_user_organization_users[];
}

export interface getUser_user {
  __typename: "User";
  organization: getUser_user_organization | null;
}

export interface getUser {
  user: getUser_user | null;
}

export interface getUserVariables {
  filter?: FilterFindOneUserInput | null;
}
