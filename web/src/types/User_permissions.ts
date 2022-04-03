/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: User_permissions
// ====================================================

export interface User_permissions_permissions {
  __typename: "UserPermissions";
  manageUsers: boolean | null;
  manageBilling: boolean | null;
  manageBusinessProfile: boolean | null;
  uploadPatientDocuments: boolean | null;
}

export interface User_permissions {
  __typename: "User";
  permissions: User_permissions_permissions | null;
}
