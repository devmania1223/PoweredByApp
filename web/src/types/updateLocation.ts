/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateLocation
// ====================================================

export interface updateLocation_locationUpdateOne_record_customQrCodeColors {
  __typename: "LocationCustomQrCodeColors";
  primary: string | null;
  secondary: string | null;
}

export interface updateLocation_locationUpdateOne_record_exhibit {
  __typename: "LocationExhibit";
  liiingoExhibitId: string | null;
  _id: string | null;
  templateId: string | null;
}

export interface updateLocation_locationUpdateOne_record {
  __typename: "Location";
  _id: any;
  updatedAt: any | null;
  name: string | null;
  companyName: string | null;
  contactName: string | null;
  customQrLogoImageUrl: string | null;
  customQrCodeColors: updateLocation_locationUpdateOne_record_customQrCodeColors | null;
  headerImageUrl: string | null;
  headerLogoImageUrl: string | null;
  topicBackgroundImageUrl: string | null;
  email: string | null;
  phone: string | null;
  qrCode: string | null;
  zipPath: string | null;
  liiingoUrl: string | null;
  exhibit: updateLocation_locationUpdateOne_record_exhibit | null;
}

export interface updateLocation_locationUpdateOne {
  __typename: "UpdateOneLocationPayload";
  /**
   * Document ID
   */
  recordId: any | null;
  /**
   * Updated document
   */
  record: updateLocation_locationUpdateOne_record | null;
}

export interface updateLocation {
  /**
   * Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it.
   */
  locationUpdateOne: updateLocation_locationUpdateOne | null;
}

export interface updateLocationVariables {
  id: any;
  name: string;
  contactName: string;
  companyName: string;
}
