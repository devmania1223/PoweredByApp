/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumLocationExhibitTemplatedContentLiiingoContentType } from "./globalTypes";

// ====================================================
// GraphQL query operation: getLocationForUser
// ====================================================

export interface getLocationForUser_user_location_customQrCodeColors {
  __typename: "LocationCustomQrCodeColors";
  primary: string | null;
  secondary: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_en {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_es {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_zh_Hans {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_de {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_pt {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_fr {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_it {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_ru {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_ja {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_ko {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_no {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_el {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages_tr {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent_languages {
  __typename: "ContentLanguages";
  en: getLocationForUser_user_location_exhibit_templatedContent_languages_en | null;
  es: getLocationForUser_user_location_exhibit_templatedContent_languages_es | null;
  zh_Hans: getLocationForUser_user_location_exhibit_templatedContent_languages_zh_Hans | null;
  de: getLocationForUser_user_location_exhibit_templatedContent_languages_de | null;
  pt: getLocationForUser_user_location_exhibit_templatedContent_languages_pt | null;
  fr: getLocationForUser_user_location_exhibit_templatedContent_languages_fr | null;
  it: getLocationForUser_user_location_exhibit_templatedContent_languages_it | null;
  ru: getLocationForUser_user_location_exhibit_templatedContent_languages_ru | null;
  ja: getLocationForUser_user_location_exhibit_templatedContent_languages_ja | null;
  ko: getLocationForUser_user_location_exhibit_templatedContent_languages_ko | null;
  no: getLocationForUser_user_location_exhibit_templatedContent_languages_no | null;
  el: getLocationForUser_user_location_exhibit_templatedContent_languages_el | null;
  tr: getLocationForUser_user_location_exhibit_templatedContent_languages_tr | null;
}

export interface getLocationForUser_user_location_exhibit_templatedContent {
  __typename: "LocationExhibitTemplatedContent";
  _id: any | null;
  liiingoContentId: string | null;
  liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType | null;
  languages: getLocationForUser_user_location_exhibit_templatedContent_languages | null;
}

export interface getLocationForUser_user_location_exhibit {
  __typename: "LocationExhibit";
  liiingoExhibitId: string | null;
  _id: string | null;
  templateId: string | null;
  templatedContent: (getLocationForUser_user_location_exhibit_templatedContent | null)[] | null;
}

export interface getLocationForUser_user_location {
  __typename: "Location";
  _id: any;
  updatedAt: any | null;
  name: string | null;
  companyName: string | null;
  contactName: string | null;
  customQrLogoImageUrl: string | null;
  customQrCodeColors: getLocationForUser_user_location_customQrCodeColors | null;
  headerImageUrl: string | null;
  headerLogoImageUrl: string | null;
  topicBackgroundImageUrl: string | null;
  email: string | null;
  phone: string | null;
  qrCode: string | null;
  zipPath: string | null;
  liiingoUrl: string | null;
  exhibit: getLocationForUser_user_location_exhibit | null;
}

export interface getLocationForUser_user {
  __typename: "User";
  location: getLocationForUser_user_location | null;
}

export interface getLocationForUser {
  user: getLocationForUser_user | null;
}

export interface getLocationForUserVariables {
  sub: string;
}
