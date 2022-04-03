/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getScheduledNotifications
// ====================================================

export interface getScheduledNotifications_getNotifications_notifications {
  __typename: "PushNotification";
  _id: string | null;
  scheduleTime: string | null;
  message: string | null;
}

export interface getScheduledNotifications_getNotifications {
  __typename: "getNotificationResponse";
  notifications: (getScheduledNotifications_getNotifications_notifications | null)[] | null;
}

export interface getScheduledNotifications {
  getNotifications: getScheduledNotifications_getNotifications | null;
}

export interface getScheduledNotificationsVariables {
  id: string;
}
