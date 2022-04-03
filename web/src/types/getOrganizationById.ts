/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getOrganizationById
// ====================================================

export interface getOrganizationById_organizationById_address {
  __typename: "OrganizationAddress";
  country: string | null;
  administrativeArea: string | null;
  subAdministrativeArea: string | null;
  locality: string | null;
  postalCode: string | null;
  thoroughfare: string | null;
  premise: string | null;
}

export interface getOrganizationById_organizationById_permissions {
  __typename: "OrganizationPermissions";
  organizationProfile: boolean | null;
  hasLiiingoAccess: boolean | null;
  brandedLiiingoApp: boolean | null;
}

export interface getOrganizationById_organizationById {
  __typename: "Organization";
  _id: any;
  name: string | null;
  address: getOrganizationById_organizationById_address | null;
  email: string | null;
  phone: string | null;
  liiingoOrganizationId: string | null;
  active: boolean | null;
  stripeCustomerId: string | null;
  permissions: getOrganizationById_organizationById_permissions | null;
  updatedAt: any | null;
  createdAt: any | null;
}

export interface getOrganizationById {
  organizationById: getOrganizationById_organizationById | null;
}

export interface getOrganizationByIdVariables {
  id: any;
}
