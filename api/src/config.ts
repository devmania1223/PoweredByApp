import { logger } from './util/logger';
import { appHealth } from './util/appHealth';

// Any keys added to this type should also go in ../.env.example
interface Configuration {
  APOLLO_DEBUG_MODE: boolean;
  AWS_ACCESS_KEY: string;
  AWS_SECRET_KEY: string;
  BUGSNAG_API_KEY: string;
  BUGSNAG_RELEASE_STAGE: string;
  CLIENT_URL: string;
  COGNITO_APP_ID: string;
  COGNITO_REGION: string;
  COGNITO_USER_POOL_ID: string;
  JWT_SECRET: string;
  LIIINGO_PASSWORD: string;
  LIIINGO_URL: string;
  LIIINGO_USERNAME: string;
  MONGO_CONNECTION_URL: string;
  SENDGRID_API_KEY: string;
  SENDGRID_SANDBOX_EMAILS: boolean;
  SERVER_URL: string;
  SHOW_GRAPHIQL: boolean;
  STRIPE_PRIVATE_KEY: string;
  S3_IMAGE_BUCKET: string;
}

function isValidConfig(env: any): env is Configuration {
  const schema: Record<keyof Configuration, string> = {
    APOLLO_DEBUG_MODE: '',
    AWS_ACCESS_KEY: '',
    AWS_SECRET_KEY: '',
    BUGSNAG_API_KEY: '',
    BUGSNAG_RELEASE_STAGE: '',
    CLIENT_URL: '',
    COGNITO_APP_ID: '',
    COGNITO_REGION: '',
    COGNITO_USER_POOL_ID: '',
    JWT_SECRET: '',
    LIIINGO_PASSWORD: '',
    LIIINGO_URL: '',
    LIIINGO_USERNAME: '',
    MONGO_CONNECTION_URL: '',
    SENDGRID_API_KEY: '',
    SENDGRID_SANDBOX_EMAILS: '',
    SERVER_URL: '',
    SHOW_GRAPHIQL: '',
    STRIPE_PRIVATE_KEY: '',
    S3_IMAGE_BUCKET: '',
  };

  const missingKeys = Object.keys(schema)
    .filter((key) => env[key] === undefined)
    .map((key) => key as keyof Configuration);

  if (missingKeys.length > 0) {
    const err = new Error(
      `Configuration is missing some keys: ${missingKeys.join(', ')}. ` +
        'Set values for these keys in the .env file (pre-prod) or env-secrets.yaml (prod).'
    );
    appHealth.configurationSuccess = false;
    appHealth.recordError('Configuration is missing some keys', 'config');
    logger.error(err);

    return false;
  }
  return true;
}
// const config = (process.env as any) as Configuration;
const getConfig = () => {
  let config = process.env;

  if (isValidConfig(config)) {
    appHealth.configurationSuccess = true;
    return config as Configuration;
  }
  return process.env as unknown as Configuration;
};

const config = getConfig();
export { config };
