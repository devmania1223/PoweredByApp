/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteNotification
// ====================================================

export interface deleteNotification_deleteNotification {
  __typename: "DeleteNotificationResponse";
  success: boolean;
}

export interface deleteNotification {
  deleteNotification: deleteNotification_deleteNotification | null;
}

export interface deleteNotificationVariables {
  id: string;
}
