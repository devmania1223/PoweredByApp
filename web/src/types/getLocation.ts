/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumLocationExhibitTemplatedContentLiiingoContentType } from "./globalTypes";

// ====================================================
// GraphQL query operation: getLocation
// ====================================================

export interface getLocation_getLocationById_customQrCodeColors {
  __typename: "LocationCustomQrCodeColors";
  primary: string | null;
  secondary: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_en {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_es {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_zh_Hans {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_de {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_pt {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_fr {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_it {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_ru {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_ja {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_ko {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_no {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_el {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages_tr {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent_languages {
  __typename: "ContentLanguages";
  en: getLocation_getLocationById_exhibit_templatedContent_languages_en | null;
  es: getLocation_getLocationById_exhibit_templatedContent_languages_es | null;
  zh_Hans: getLocation_getLocationById_exhibit_templatedContent_languages_zh_Hans | null;
  de: getLocation_getLocationById_exhibit_templatedContent_languages_de | null;
  pt: getLocation_getLocationById_exhibit_templatedContent_languages_pt | null;
  fr: getLocation_getLocationById_exhibit_templatedContent_languages_fr | null;
  it: getLocation_getLocationById_exhibit_templatedContent_languages_it | null;
  ru: getLocation_getLocationById_exhibit_templatedContent_languages_ru | null;
  ja: getLocation_getLocationById_exhibit_templatedContent_languages_ja | null;
  ko: getLocation_getLocationById_exhibit_templatedContent_languages_ko | null;
  no: getLocation_getLocationById_exhibit_templatedContent_languages_no | null;
  el: getLocation_getLocationById_exhibit_templatedContent_languages_el | null;
  tr: getLocation_getLocationById_exhibit_templatedContent_languages_tr | null;
}

export interface getLocation_getLocationById_exhibit_templatedContent {
  __typename: "LocationExhibitTemplatedContent";
  _id: any | null;
  liiingoContentId: string | null;
  liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType | null;
  languages: getLocation_getLocationById_exhibit_templatedContent_languages | null;
}

export interface getLocation_getLocationById_exhibit {
  __typename: "LocationExhibit";
  liiingoExhibitId: string | null;
  _id: string | null;
  templateId: string | null;
  templatedContent: (getLocation_getLocationById_exhibit_templatedContent | null)[] | null;
}

export interface getLocation_getLocationById {
  __typename: "Location";
  _id: any;
  updatedAt: any | null;
  name: string | null;
  companyName: string | null;
  contactName: string | null;
  customQrLogoImageUrl: string | null;
  customQrCodeColors: getLocation_getLocationById_customQrCodeColors | null;
  headerImageUrl: string | null;
  headerLogoImageUrl: string | null;
  topicBackgroundImageUrl: string | null;
  email: string | null;
  phone: string | null;
  qrCode: string | null;
  zipPath: string | null;
  liiingoUrl: string | null;
  exhibit: getLocation_getLocationById_exhibit | null;
}

export interface getLocation {
  getLocationById: getLocation_getLocationById | null;
}

export interface getLocationVariables {
  id: any;
}
