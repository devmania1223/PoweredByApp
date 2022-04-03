/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOneOrganizationAddressInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateOrganizationInfo
// ====================================================

export interface updateOrganizationInfo_organizationUpdateOne_record_address {
  __typename: "OrganizationAddress";
  country: string | null;
  administrativeArea: string | null;
  subAdministrativeArea: string | null;
  locality: string | null;
  postalCode: string | null;
  thoroughfare: string | null;
  premise: string | null;
}

export interface updateOrganizationInfo_organizationUpdateOne_record_permissions {
  __typename: "OrganizationPermissions";
  organizationProfile: boolean | null;
  hasLiiingoAccess: boolean | null;
  brandedLiiingoApp: boolean | null;
}

export interface updateOrganizationInfo_organizationUpdateOne_record {
  __typename: "Organization";
  _id: any;
  name: string | null;
  address: updateOrganizationInfo_organizationUpdateOne_record_address | null;
  email: string | null;
  phone: string | null;
  liiingoOrganizationId: string | null;
  active: boolean | null;
  stripeCustomerId: string | null;
  permissions: updateOrganizationInfo_organizationUpdateOne_record_permissions | null;
  updatedAt: any | null;
  createdAt: any | null;
}

export interface updateOrganizationInfo_organizationUpdateOne {
  __typename: "UpdateOneOrganizationPayload";
  /**
   * Updated document
   */
  record: updateOrganizationInfo_organizationUpdateOne_record | null;
}

export interface updateOrganizationInfo {
  /**
   * Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it.
   */
  organizationUpdateOne: updateOrganizationInfo_organizationUpdateOne | null;
}

export interface updateOrganizationInfoVariables {
  id: any;
  organizationName?: string | null;
  address?: UpdateOneOrganizationAddressInput | null;
  phone?: string | null;
}
