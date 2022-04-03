import ApolloClient from 'apollo-boost';
import * as mongoose from 'mongoose';
import { logger } from '../src/util/logger';
import * as _createRows from './createRows';

export const createRows = _createRows;

const mongooseOptions = {
  autoIndex: false,
  autoReconnect: false,
  connectTimeoutMS: 10000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Just in case want to debug something
// mongoose.set('debug', true);

export async function connectMongoose() {
  jest.setTimeout(20000);
  return mongoose.connect(
    // @ts-ignore
    global.__MONGO_URI__,
    {
      ...mongooseOptions,
      // @ts-ignore
      dbName: global.__MONGO_DB_NAME__,
    }
  );
}

export async function clearDatabase() {
  await mongoose.connection.db.dropDatabase();
}

export async function disconnectMongoose() {
  await mongoose.disconnect();
  mongoose.connections.forEach((connection) => {
    const modelNames = Object.keys(connection.models);

    modelNames.forEach((modelName) => {
      delete connection.models[modelName];
    });

    const collectionNames = Object.keys(connection.collections);
    collectionNames.forEach((collectionName) => {
      delete connection.collections[collectionName];
    });
  });

  const modelSchemaNames = Object.keys(mongoose.SchemaTypes);
  modelSchemaNames.forEach((modelSchemaName) => {
    delete mongoose.SchemaTypes[modelSchemaName];
  });
}

export async function clearDbAndRestartCounters() {
  await clearDatabase();
  createRows.restartCounters();
}

export function getContext(context: any) {
  return {
    ...context,
    req: {},
  };
}

export const client = new ApolloClient({
  // @ts-ignore
  uri: `http://localhost:${global.__SERVER_PORT__}/`,
  onError: (e) => {
    logger.error(e);
  },
});

module.exports = {
  connectMongoose,
  clearDatabase,
  disconnectMongoose,
  clearDbAndRestartCounters,
  getContext,
  client,
  createRows,
};
