/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum EnumLocationExhibitTemplatedContentLiiingoContentType {
  image = "image",
  text = "text",
  video = "video",
  webview = "webview",
}

export enum SortUpdateOneUserInput {
  CREATEDAT_ASC = "CREATEDAT_ASC",
  CREATEDAT_DESC = "CREATEDAT_DESC",
  CREATEDAT__UPDATEDAT_ASC = "CREATEDAT__UPDATEDAT_ASC",
  CREATEDAT__UPDATEDAT_DESC = "CREATEDAT__UPDATEDAT_DESC",
  SUB_ASC = "SUB_ASC",
  SUB_DESC = "SUB_DESC",
  _ID_ASC = "_ID_ASC",
  _ID_DESC = "_ID_DESC",
}

export interface ContentLanguagesContentInput {
  name?: string | null;
  value?: string | null;
  fileUrl?: string | null;
  binaryValue?: any | null;
}

export interface ContentLanguagesInput {
  en?: ContentLanguagesContentInput | null;
  es?: ContentLanguagesContentInput | null;
  zh_Hans?: ContentLanguagesContentInput | null;
  de?: ContentLanguagesContentInput | null;
  pt?: ContentLanguagesContentInput | null;
  fr?: ContentLanguagesContentInput | null;
  it?: ContentLanguagesContentInput | null;
  ru?: ContentLanguagesContentInput | null;
  ja?: ContentLanguagesContentInput | null;
  ko?: ContentLanguagesContentInput | null;
  no?: ContentLanguagesContentInput | null;
  el?: ContentLanguagesContentInput | null;
  tr?: ContentLanguagesContentInput | null;
}

export interface FilterFindOneUserCreatedAtOperatorsInput {
  gt?: any | null;
  gte?: any | null;
  lt?: any | null;
  lte?: any | null;
  ne?: any | null;
  in?: (any | null)[] | null;
  nin?: (any | null)[] | null;
  exists?: boolean | null;
}

export interface FilterFindOneUserInput {
  sub?: string | null;
  email?: string | null;
  username?: string | null;
  organizationId?: any | null;
  locationId?: any | null;
  planId?: any | null;
  billing?: string | null;
  referrer?: string | null;
  inviteAccepted?: boolean | null;
  active?: boolean | null;
  _id?: any | null;
  updatedAt?: any | null;
  createdAt?: any | null;
  _operators?: FilterFindOneUserOperatorsInput | null;
  OR?: FilterFindOneUserInput[] | null;
  AND?: FilterFindOneUserInput[] | null;
}

/**
 * For performance reason this type contains only *indexed* fields.
 */
export interface FilterFindOneUserOperatorsInput {
  sub?: FilterFindOneUserSubOperatorsInput | null;
  _id?: FilterFindOneUser_idOperatorsInput | null;
  createdAt?: FilterFindOneUserCreatedAtOperatorsInput | null;
}

export interface FilterFindOneUserSubOperatorsInput {
  gt?: string | null;
  gte?: string | null;
  lt?: string | null;
  lte?: string | null;
  ne?: string | null;
  in?: (string | null)[] | null;
  nin?: (string | null)[] | null;
  regex?: any | null;
  exists?: boolean | null;
}

export interface FilterFindOneUser_idOperatorsInput {
  gt?: any | null;
  gte?: any | null;
  lt?: any | null;
  lte?: any | null;
  ne?: any | null;
  in?: (any | null)[] | null;
  nin?: (any | null)[] | null;
  exists?: boolean | null;
}

export interface FilterUpdateOneUserInput {
  sub?: string | null;
}

export interface UpdateOneLocationExhibitTemplatedContentInput {
  liiingoContentId?: string | null;
  liiingoContentType?: EnumLocationExhibitTemplatedContentLiiingoContentType | null;
  languages?: ContentLanguagesInput | null;
  _id?: any | null;
}

export interface UpdateOneOrganizationAddressInput {
  country?: string | null;
  administrativeArea?: string | null;
  subAdministrativeArea?: string | null;
  locality?: string | null;
  postalCode?: string | null;
  thoroughfare?: string | null;
  premise?: string | null;
}

export interface UpdateOneUserInput {
  sub?: string | null;
  email?: string | null;
  username?: string | null;
  organizationId?: any | null;
  locationId?: any | null;
  planId?: any | null;
  billing?: string | null;
  inviteAccepted?: boolean | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
