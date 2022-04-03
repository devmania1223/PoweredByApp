const pino = require('pino');
const rTracer = require('cls-rtracer');
import { Logger } from 'pino';

const getDevModeOptions = () => ({
  prettyPrint: {
    levelFirst: true,
    colorize: true,
  },
  prettifier: require('pino-pretty'),
});
const getProdModeOptions = () => ({
  prettyPrint: false,
});

// We don't have access to the 'config' object yet because we're too early in the application lifecycle,
// so we'll read directly from process.env
const envDependentOptions = process.env.APOLLO_DEBUG_MODE === 'true' ? getDevModeOptions() : getProdModeOptions();

export const logger: Logger = pino({
  name: 'poweredby-api',
  redact: ['req.headers.authorization'],
  timestamp: pino.stdTimeFunctions.isoTime,
  mixin: () => {
    return { transactionId: rTracer.id() };
  },
  ...envDependentOptions,
});
