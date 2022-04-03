const rTracer = require('cls-rtracer');
import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a transactionId for each inbound request.
 * This transactionId can be accessed throughout the app with:
 *
 *     const rTracer = require('cls-rtracer');
 *     const transactionId = rTracer.id();
 *
 * If a 'transaction-id' header is present on an inbound request, we will adopt that transactionId instead of generating one.
 * The transactionId generated here is appended to every log entry by the logger, which is configured in `logger.ts`
 */
export const transactionIdMiddleware = () =>
  rTracer.koaMiddleware({
    // Respect request header flag (default: false).
    // If set to true, the middleware/plugin will always use a value from
    // the specified header (if the value is present).
    useHeader: true,
    // Request/response header name, case insensitive (default: 'X-Request-Id').
    // Used if useHeader/echoHeader is set to true.
    headerName: 'transaction-id',
    // A custom function to generate your request ids (default: UUID v1).
    // Ignored if useHeader is set to true.
    requestIdFactory: uuidv4,
    // Add request id to response header (default: false).
    // If set to true, the middleware/plugin will add request id to the specified header.
    // Use headerName option to specify header name.
    echoHeader: true,
  });
