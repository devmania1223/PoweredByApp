import { config } from '../config';
const mongoose = require('mongoose');
import { logger } from '../util/logger';

/**
 *
 * @param onSuccess A callback function that will execute after a db connection is successfully established
 * @param onInitialFailure A callback function that will execute if there is an error while establishing the initial db connection on startup
 */
export function getDatabaseConnection(onSuccess: Function, onInitialFailure: (error: Error) => void) {
  // mongoose options
  const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // TODO: Set {autoIndex: false} once we have a way of manually building the indexes for each model. https://stackoverflow.com/questions/14342708/mongoose-indexing-in-production-code
    autoIndex: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    bufferCommands: false,
    socketTimeoutMS: 0,
    keepAlive: true,
    // authSource: 'admin', // We're currently specifying this in the mongodb connection string, but we could do it here instead
  };

  // mongodb environment variables
  // assumes that index.ts has already bootstrapped the environment
  const { MONGO_CONNECTION_URL } = config;

  // e.g. ${MONGO_PROTOCOL}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin
  const connection = mongoose.connect(MONGO_CONNECTION_URL, options);
  connection
    .then((db: any) => {
      logger.info('Database connection established');
      onSuccess();
      db;
    })
    .catch((error: Error) => {
      logger.error(`Error establishing a database connection: ${error}`);
      onInitialFailure(error);
    });
}

module.exports = {
  getDatabaseConnection,
};
