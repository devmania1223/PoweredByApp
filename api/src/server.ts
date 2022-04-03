import { graphqlUploadKoa } from 'graphql-upload';
import Koa from 'koa';
import restRequestLogger from 'koa-pino-logger';
import { BaseLogger } from 'pino';
import { graphqlRequestLogger } from './apolloPlugins';
import { config } from './config';
import { errorFormatter } from './errors/errorFormatter';
import schema from './features';
import { UserModel } from './features/users/model';
import { transactionIdMiddleware } from './middleware/transactionIdMiddleware';
import { handleWebhook } from './services/stripe';
import { appHealth } from './util/appHealth';
import { logger } from './util/logger';
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { ApolloServer } = require('apollo-server-koa');
const cors = require('@koa/cors');
const rTracer = require('cls-rtracer');

// AppContext is the 'context' that gets passed to each GraphQL resolver
export type AppContext = {
  request: Koa.Request;
  logger: BaseLogger;
  transactionId: string;
  user?: UserModel; // This will only be present in context for resolvers that are behind the auth middleware
};

export async function createApp() {
  const app = new Koa();
  const router = new Router();
  app.use(bodyParser());
  app.use(
    graphqlUploadKoa({
      // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
      maxFileSize: 10000000, // 10 MB
      maxFiles: 20,
    })
  );

  app.use(
    cors({
      origin: config.CLIENT_URL,
    })
  );

  // Generate a UUID transactionId that will be appended to every log line that uses this logger (available via context.logger in GraphQL resolvers)
  app.use(transactionIdMiddleware());

  const server = new ApolloServer({
    uploads: false,
    schema,
    context: async (req: Koa.Request) => {
      return {
        request: req.ctx.request,
        transactionId: rTracer.id(),
        logger: logger,
      };
    },
    formatError: errorFormatter,
    logger: logger,
    debug: config.APOLLO_DEBUG_MODE,
    playground: config.SHOW_GRAPHIQL,
    plugins: [graphqlRequestLogger],
  });

  server.applyMiddleware({ app });

  router.get('/healthz', (ctx: Koa.BaseContext, next: () => Promise<any>) => {
    ctx.body = JSON.stringify(appHealth);
    ctx.set('Content-Type', 'application/json');
    ctx.status = appHealth.servingTraffic ? 200 : 503;
  });

  router.post('/stripe-webhook', restRequestLogger({ logger }), async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
      await handleWebhook(ctx.request.body);
      ctx.body = 'OK';
    } catch (err) {
      logger.error(`⚠️  Webhook error while parsing Stripe request.`, err.message);
      return;
    }
  });

  app.use(router.routes()).use(router.allowedMethods());

  return app;
}

export async function createHealthzOnly() {
  const app = new Koa();
  const router = new Router();
  app.use(bodyParser());
  app.use(transactionIdMiddleware());
  router.get('/healthz', (ctx: Koa.BaseContext, next: () => Promise<any>) => {
    ctx.body = JSON.stringify(appHealth);
    ctx.set('Content-Type', 'application/json');
    ctx.status = appHealth.servingTraffic ? 200 : 503;
  });
  app.use(router.routes()).use(router.allowedMethods());

  return app;
}

module.exports = {
  createApp,
  createHealthzOnly,
};
