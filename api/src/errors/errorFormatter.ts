import { GraphQLError } from 'graphql';
import { logger } from '../util/logger';
import { config } from '../config';
import { AuthenticationError, UserInputError, ForbiddenError, ApolloError } from 'apollo-server-koa';

/**
 * The errorFormatter is used by Apollo Server to turn caught errors into GraphQL
 * responses. Anything that gets returned from the errorFormatter function will be
 * user-facing.
 */
export const errorFormatter = (error: GraphQLError) => {
  // The server logs will always contain the full detailed error with stack trace
  logAtAppropriateLevel(error);

  // Specifically handle Mongoose 'uniqueness' errors (Mongo error code 11000)
  // This formatting logic will be applied whether DEBUG_MODE is set or not since it's essentially
  // a validation error but presents itself as a server error
  if (error.extensions?.exception?.name === 'MongoError' && error.extensions?.exception?.code == 11000) {
    return new GraphQLError(
      `An entry already exists that's using ${JSON.stringify(
        error.extensions.exception.keyValue
      )}. Please provide a unique value.`,
      error.nodes,
      error.source,
      error.positions,
      error.path,
      null,
      { duplicateValue: error.extensions.exception.keyValue }
    );
  }

  // The response sent to the client will sometimes be masked
  // Any logic BELOW this line will be applied when DEBUG_MODE is OFF (i.e. in production)
  // If you want to format an error ALWAYS (even in DEBUG_MODE), the formatting logic should go ABOVE this line.
  if (config.APOLLO_DEBUG_MODE) {
    return error;
  }

  if (error.extensions?.code === 'INTERNAL_SERVER_ERROR') {
    // Internal Server Errors will be opaque to the client - no details are exposed
    return new GraphQLError('Internal server error', error.nodes, error.source, error.positions, error.path);
  }

  // Remove the stack trace from the error message, but return everything else to the client
  const { exception, ...otherExtensions } = error.extensions as { exception?: any };
  return { ...error, extensions: otherExtensions };
};

/**
 * Log with a severity level that's appropriate for the type of error.
 */
const logAtAppropriateLevel = (error: GraphQLError) => {
  if (error.originalError instanceof AuthenticationError) {
    logger.info(error);
    return;
  }

  if (error.originalError instanceof UserInputError) {
    logger.info(error);
    return;
  }

  if (error.originalError instanceof ForbiddenError) {
    logger.info(error);
    return;
  }

  logger.error(error);
  return;
};
