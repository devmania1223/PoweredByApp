import { schemaComposer } from 'graphql-compose';
import { liiingo } from '../../';
import { authMiddleware } from '../../middleware/auth';
import { logger } from '../../util/logger';
import { Location } from '../location/model';
import { Organization, OrganizationModel } from '../organizations/model';
import { User } from '../users/model';

const sendNotificationResponse = schemaComposer.createObjectTC({
  name: 'SendNotificationResponse',
  fields: {
    success: 'Boolean!',
  },
});

// The graphql-compose "schema" definition
const sendNotificationMutationArgs = {
  message: 'String!',
  scheduledTime: 'String',
  topicId: 'String!',
};
// The Typescript definition
type SendNotificationMutationArgs = {
  message: string;
  scheduledTime: string;
  topicId: string;
};
export const sendNotificationMutation = schemaComposer.createResolver<null, SendNotificationMutationArgs>({
  kind: 'mutation',
  name: 'sendNotification',
  args: sendNotificationMutationArgs,
  type: sendNotificationResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }) => {
    const callingUser = context.user!; // The user MUST be populated by the auth middleware
    const userMeta = await User.findOne({ sub: callingUser.sub });
    if (!userMeta) {
      throw new Error(
        `Couldn't find a user record for the user requesting to send a push notification (sub: ${callingUser.sub})`
      );
    }

    const location = await Location.findById(userMeta.locationId);
    if (!location) {
      throw new Error(
        `Couldn't find the Location record for the user requesting to send a push notification (sub: ${callingUser.sub})`
      );
    }

    const organization: OrganizationModel | null = await Organization.findById(userMeta.organizationId);
    if (!organization) {
      logger.error(
        `UserID ${callingUser._id} requested to send a notification, but no Organization could be found for that user (with organizationId: ${userMeta.organizationId})`
      );
      throw new Error(`No organization found with ID ${userMeta.organizationId}`);
    }

    const success = await liiingo.sendPushNotification({
      message: args.message,
      scheduleTime: args.scheduledTime || new Date().toUTCString(),
      scheduleType: args.scheduledTime ? 'schedule' : 'immediate',
      topicType: 'exhibit',
      topicTypeId: args.topicId, //organization.liiingoExhibitId,
      topicName: `${location.name}`,
    });

    return {
      success: success === 'Success',
    };
  },
});

const deleteNotificationResponse = schemaComposer.createObjectTC({
  name: 'DeleteNotificationResponse',
  fields: {
    success: 'Boolean!',
  },
});

// The graphql-compose "schema" definition
const deleteNotificationMutationArgs = {
  id: 'String!',
};
// The Typescript definition
type DeleteNotificationMutationArgs = {
  id: string;
};
export const deleteNotificationMutation = schemaComposer.createResolver<null, DeleteNotificationMutationArgs>({
  kind: 'mutation',
  name: 'deleteNotification',
  args: deleteNotificationMutationArgs,
  type: deleteNotificationResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }) => {
    const success = await liiingo.deletePushNotification(args.id);
    return {
      success,
    };
  },
});

const pushNotificationType = schemaComposer.addTypeDefs(`
  type PushNotification {
    _id: String
    topicName: String
    topicType: String
    topicTypeId: String
    message: String
    scheduleType: String
    scheduleTime: String
    locationId: String
    notificationSent: Boolean
    createdDate: String
    modifiedDate: String
  }
`);

const getNotificationResponse = schemaComposer.createObjectTC({
  name: 'getNotificationResponse',
  fields: {
    notifications: '[PushNotification]',
  },
});

// The graphql-compose "schema" definition
const getNotificationMutationArgs = {
  topicId: 'String!',
};
// The Typescript definition
type GetNotificationMutationArgs = {
  topicId: string;
};
export const getNotificationMutation = schemaComposer.createResolver<null, GetNotificationMutationArgs>({
  kind: 'query',
  name: 'getNotifications',
  args: getNotificationMutationArgs,
  type: getNotificationResponse,
  // @ts-ignore anonymous function, graphql-compose didn't seem to export types nicely
  resolve: async ({ args, context }) => {
    const notifications = await liiingo.getScheduledPushNotifications(args.topicId);
    return {
      notifications: notifications.map((notification) => {
        return {
          ...notification,
          _id: notification._id.$oid,
          scheduleTime: new Date(parseInt(notification.scheduleTime.$date.$numberLong)).toISOString(),
          createdDate: new Date(parseInt(notification.createdDate.$date.$numberLong)).toISOString(),
          modifiedDate: new Date(parseInt(notification.modifiedDate.$date.$numberLong)).toISOString(),
        };
      }),
    };
  },
});

export const NotificationQueries = {
  getNotifications: getNotificationMutation.withMiddlewares([authMiddleware]),
};

export const NotificationMutations = {
  sendNotification: sendNotificationMutation.withMiddlewares([authMiddleware]),
  deleteNotification: deleteNotificationMutation.withMiddlewares([authMiddleware]),
};
