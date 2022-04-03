// This line makes absolute imports work
require('app-module-path').addPath(require('path').join(__dirname, '../'));

import { Liiingo } from '@liiingo/core-api-client-typescript';
import { config } from './config';
import { createApp, createHealthzOnly } from './server';
import { getDatabaseConnection } from './services/database';
import { appHealth } from './util/appHealth';
import { logger } from './util/logger';

let liiingo: Liiingo;
const configureLiiingoClient = () => {
  return new Liiingo({
    credentials: {
      email: config.LIIINGO_USERNAME,
      password: config.LIIINGO_PASSWORD,
    },
    environment: 'custom',
    url: config.LIIINGO_URL,
    logger: logger,
  });
};

const onServiceFailure = () => {
  if (!module.parent) {
    (async () => {
      appHealth.servingTraffic = false;
      const app = await createHealthzOnly();
      app.listen(4000);
      const errorMessageStrings = appHealth.errors.map((error) => `${error.phase}: ${error.message}`);
      console.error(`API is listening at 4000 (degraded - healthz only). Reasons: ${errorMessageStrings}`);
    })();
  }
};

getDatabaseConnection(
  () => {
    appHealth.dbConnectionSuccess = true;
    if (!module.parent) {
      (async () => {
        const app = await createApp();
        try {
          liiingo = configureLiiingoClient();
          await liiingo.authenticate();
          appHealth.liiingoConnectionSuccess = true;
          app.listen(4000);
          appHealth.servingTraffic = true;
          console.log('API is listening at 4000');
        } catch (error) {
          appHealth.liiingoConnectionSuccess = false;
          appHealth.recordError(`${error.message.substr(0, 35)}...`, 'liiingo');
          onServiceFailure();
        }
      })();
    }
  },
  (error) => {
    appHealth.recordError(`${error.message.substr(0, 35)}...`, 'db');
    appHealth.dbConnectionSuccess = false;
    onServiceFailure();
  }
);

export { liiingo };
