/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Organization_organization
// ====================================================

export interface Organization_organization_address {
  __typename: "OrganizationAddress";
  country: string | null;
  administrativeArea: string | null;
  subAdministrativeArea: string | null;
  locality: string | null;
  postalCode: string | null;
  thoroughfare: string | null;
  premise: string | null;
}

export interface Organization_organization_permissions {
  __typename: "OrganizationPermissions";
  organizationProfile: boolean | null;
  hasLiiingoAccess: boolean | null;
  brandedLiiingoApp: boolean | null;
}

export interface Organization_organization {
  __typename: "Organization";
  _id: any;
  name: string | null;
  address: Organization_organization_address | null;
  email: string | null;
  phone: string | null;
  liiingoOrganizationId: string | null;
  active: boolean | null;
  stripeCustomerId: string | null;
  permissions: Organization_organization_permissions | null;
  updatedAt: any | null;
  createdAt: any | null;
}
