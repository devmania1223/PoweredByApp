/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Location_location
// ====================================================

export interface Location_location_customQrCodeColors {
  __typename: "LocationCustomQrCodeColors";
  primary: string | null;
  secondary: string | null;
}

export interface Location_location_exhibit {
  __typename: "LocationExhibit";
  liiingoExhibitId: string | null;
  _id: string | null;
  templateId: string | null;
}

export interface Location_location {
  __typename: "Location";
  _id: any;
  updatedAt: any | null;
  name: string | null;
  companyName: string | null;
  contactName: string | null;
  customQrLogoImageUrl: string | null;
  customQrCodeColors: Location_location_customQrCodeColors | null;
  headerImageUrl: string | null;
  headerLogoImageUrl: string | null;
  topicBackgroundImageUrl: string | null;
  email: string | null;
  phone: string | null;
  qrCode: string | null;
  zipPath: string | null;
  liiingoUrl: string | null;
  exhibit: Location_location_exhibit | null;
}
