/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: sendNotification
// ====================================================

export interface sendNotification_sendNotification {
  __typename: "SendNotificationResponse";
  success: boolean;
}

export interface sendNotification {
  sendNotification: sendNotification_sendNotification | null;
}

export interface sendNotificationVariables {
  message: string;
  scheduledTime?: string | null;
  topicId: string;
}
