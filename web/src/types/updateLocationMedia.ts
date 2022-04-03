/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateLocationMedia
// ====================================================

export interface updateLocationMedia_locationUpdateOne_record_customQrCodeColors {
  __typename: "LocationCustomQrCodeColors";
  primary: string | null;
  secondary: string | null;
}

export interface updateLocationMedia_locationUpdateOne_record_exhibit {
  __typename: "LocationExhibit";
  liiingoExhibitId: string | null;
  _id: string | null;
  templateId: string | null;
}

export interface updateLocationMedia_locationUpdateOne_record {
  __typename: "Location";
  _id: any;
  updatedAt: any | null;
  name: string | null;
  companyName: string | null;
  contactName: string | null;
  customQrLogoImageUrl: string | null;
  customQrCodeColors: updateLocationMedia_locationUpdateOne_record_customQrCodeColors | null;
  headerImageUrl: string | null;
  headerLogoImageUrl: string | null;
  topicBackgroundImageUrl: string | null;
  email: string | null;
  phone: string | null;
  qrCode: string | null;
  zipPath: string | null;
  liiingoUrl: string | null;
  exhibit: updateLocationMedia_locationUpdateOne_record_exhibit | null;
}

export interface updateLocationMedia_locationUpdateOne {
  __typename: "UpdateOneLocationPayload";
  /**
   * Updated document
   */
  record: updateLocationMedia_locationUpdateOne_record | null;
}

export interface updateLocationMedia {
  /**
   * Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it.
   */
  locationUpdateOne: updateLocationMedia_locationUpdateOne | null;
}

export interface updateLocationMediaVariables {
  id: any;
  headerImageFile?: any | null;
  headerLogoImageFile?: any | null;
  topicBackgroundImageFile?: any | null;
}
