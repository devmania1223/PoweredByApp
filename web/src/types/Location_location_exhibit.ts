/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumLocationExhibitTemplatedContentLiiingoContentType } from "./globalTypes";

// ====================================================
// GraphQL fragment: Location_location_exhibit
// ====================================================

export interface Location_location_exhibit_templatedContent_languages_en {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_es {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_zh_Hans {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_de {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_pt {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_fr {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_it {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_ru {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_ja {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_ko {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_no {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_el {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages_tr {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface Location_location_exhibit_templatedContent_languages {
  __typename: "ContentLanguages";
  en: Location_location_exhibit_templatedContent_languages_en | null;
  es: Location_location_exhibit_templatedContent_languages_es | null;
  zh_Hans: Location_location_exhibit_templatedContent_languages_zh_Hans | null;
  de: Location_location_exhibit_templatedContent_languages_de | null;
  pt: Location_location_exhibit_templatedContent_languages_pt | null;
  fr: Location_location_exhibit_templatedContent_languages_fr | null;
  it: Location_location_exhibit_templatedContent_languages_it | null;
  ru: Location_location_exhibit_templatedContent_languages_ru | null;
  ja: Location_location_exhibit_templatedContent_languages_ja | null;
  ko: Location_location_exhibit_templatedContent_languages_ko | null;
  no: Location_location_exhibit_templatedContent_languages_no | null;
  el: Location_location_exhibit_templatedContent_languages_el | null;
  tr: Location_location_exhibit_templatedContent_languages_tr | null;
}

export interface Location_location_exhibit_templatedContent {
  __typename: "LocationExhibitTemplatedContent";
  _id: any | null;
  liiingoContentId: string | null;
  liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType | null;
  languages: Location_location_exhibit_templatedContent_languages | null;
}

export interface Location_location_exhibit {
  __typename: "LocationExhibit";
  liiingoExhibitId: string | null;
  _id: string | null;
  templateId: string | null;
  templatedContent: (Location_location_exhibit_templatedContent | null)[] | null;
}
