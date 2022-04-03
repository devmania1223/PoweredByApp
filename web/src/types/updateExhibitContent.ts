/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOneLocationExhibitTemplatedContentInput, EnumLocationExhibitTemplatedContentLiiingoContentType } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateExhibitContent
// ====================================================

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_en {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_es {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_zh_Hans {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_de {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_pt {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_fr {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_it {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_ru {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_ja {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_ko {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_no {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_el {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_tr {
  __typename: "ContentLanguagesContent";
  name: string | null;
  value: string | null;
  fileUrl: string | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages {
  __typename: "ContentLanguages";
  en: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_en | null;
  es: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_es | null;
  zh_Hans: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_zh_Hans | null;
  de: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_de | null;
  pt: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_pt | null;
  fr: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_fr | null;
  it: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_it | null;
  ru: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_ru | null;
  ja: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_ja | null;
  ko: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_ko | null;
  no: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_no | null;
  el: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_el | null;
  tr: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages_tr | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent {
  __typename: "LocationExhibitTemplatedContent";
  _id: any | null;
  liiingoContentId: string | null;
  liiingoContentType: EnumLocationExhibitTemplatedContentLiiingoContentType | null;
  languages: updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent_languages | null;
}

export interface updateExhibitContent_locationUpdateOne_record_exhibit {
  __typename: "LocationExhibit";
  liiingoExhibitId: string | null;
  _id: string | null;
  templateId: string | null;
  templatedContent: (updateExhibitContent_locationUpdateOne_record_exhibit_templatedContent | null)[] | null;
}

export interface updateExhibitContent_locationUpdateOne_record {
  __typename: "Location";
  _id: any;
  exhibit: updateExhibitContent_locationUpdateOne_record_exhibit | null;
}

export interface updateExhibitContent_locationUpdateOne {
  __typename: "UpdateOneLocationPayload";
  /**
   * Updated document
   */
  record: updateExhibitContent_locationUpdateOne_record | null;
}

export interface updateExhibitContent {
  /**
   * Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it.
   */
  locationUpdateOne: updateExhibitContent_locationUpdateOne | null;
}

export interface updateExhibitContentVariables {
  locationId: any;
  content?: (UpdateOneLocationExhibitTemplatedContentInput | null)[] | null;
}
