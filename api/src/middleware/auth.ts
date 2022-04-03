import { AuthenticationError } from 'apollo-server-koa';
import { Validator } from 'cognito-jwt-token-validator';
import { AppContext } from 'src/server';
import { logger } from '../util/logger';
import { config } from '../config';
import { User } from 'src/features/users/model';
const { COGNITO_USER_POOL_ID, COGNITO_REGION, COGNITO_APP_ID } = config;

const validator = new Validator(
  `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`,
  COGNITO_APP_ID
);

type CognitoToken = {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

export const authorize = async (token: string): Promise<CognitoToken> => {
  try {
    const payload = await validator.validate(token);
    return {
      sub: payload.sub,
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      username: payload['cognito:username'],
    };
  } catch (err) {
    logger.error(`error verifying user token: ${err}`);
    throw err;
  }
};

/**
 *
 * The only authentication method that this middleware currently recognizes is a Bearer token
 * in the Authorization header like this:
 *
 *    Authorization: Bearer jf2908f293f8hq98hf...
 */
export const getUserFromAuthHeader = async (authHeader: string): Promise<CognitoToken> => {
  if (!authHeader) {
    throw new AuthenticationError('Authorization header is missing');
  }

  const authorizationHeaderPieces = authHeader.split(' ');
  const isBearerToken = authorizationHeaderPieces?.length === 2 && authorizationHeaderPieces[0] === 'Bearer';

  if (!isBearerToken) {
    throw new AuthenticationError('Authorization header is malformed');
  }

  const token = authorizationHeaderPieces[1];
  return await authorize(token);
};

const appendUser = (context: AppContext, user: CognitoToken) => ({
  ...context,
  user: {
    sub: user.sub,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  },
});

export async function authMiddleware(resolve: any, source: any, args: any, context: any, info: any) {
  const token = await getUserFromAuthHeader(context?.request?.header?.authorization);
  // Treat context as immutable and make a copy with the user added
  return resolve(source, args, appendUser(context, token), info);
}

export async function canAccessUsersByOrganization(resolve: any, source: any, args: any, context: any, info: any) {
  const token = await getUserFromAuthHeader(context?.request?.header?.authorization);
  const user = await User.findOne({ sub: token.sub });
  if (user !== null && user.organizationId == args?.filter?.organizationId) {
    // Treat context as immutable and make a copy with the user added
    return resolve(source, args, appendUser(context, { ...user, ...token }), info);
  }
  throw new AuthenticationError('Not authorized to access this provider');
}

export async function canAccessOrganization(resolve: any, source: any, args: any, context: any, info: any) {
  const token = await getUserFromAuthHeader(context?.request?.header?.authorization);
  const user = await User.findOne({ sub: token.sub });
  if (user !== null && (user.organizationId == args?.filter?._id || user.organizationId == args?._id)) {
    // Treat context as immutable and make a copy with the user added
    return resolve(source, args, appendUser(context, { ...user, ...token }), info);
  }
  throw new AuthenticationError('Not authorized to access this provider');
}

export async function userMustBeSelf(resolve: any, source: any, args: any, context: any, info: any) {
  const token = await getUserFromAuthHeader(context?.request?.header?.authorization);
  const user = await User.findOne({ sub: token.sub });
  if (user !== null && (user.sub == args?.filter?.sub || user._id == args?.sub)) {
    // Treat context as immutable and make a copy with the user added
    return resolve(source, args, appendUser(context, { ...user, ...token }), info);
  }
  throw new AuthenticationError('Not authorized to access this user');
}
