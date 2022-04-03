/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOneUserInput, FilterUpdateOneUserInput, SortUpdateOneUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: userUpdateOne
// ====================================================

export interface userUpdateOne_userUpdateOne_record_organization {
  __typename: "Organization";
  _id: any;
}

export interface userUpdateOne_userUpdateOne_record {
  __typename: "User";
  _id: any;
  organization: userUpdateOne_userUpdateOne_record_organization | null;
}

export interface userUpdateOne_userUpdateOne {
  __typename: "UpdateOneUserPayload";
  /**
   * Updated document
   */
  record: userUpdateOne_userUpdateOne_record | null;
}

export interface userUpdateOne {
  /**
   * Update one document: 1) Retrieve one document via findOne. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it.
   */
  userUpdateOne: userUpdateOne_userUpdateOne | null;
}

export interface userUpdateOneVariables {
  record: UpdateOneUserInput;
  filter: FilterUpdateOneUserInput;
  sort?: SortUpdateOneUserInput | null;
  skip?: number | null;
}
