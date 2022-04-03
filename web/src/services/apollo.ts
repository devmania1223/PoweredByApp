import { ApolloClient, ApolloLink, FetchResult, InMemoryCache, Observable } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth } from '@aws-amplify/auth/lib-esm/Auth';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { ACCESS_TOKEN, ID_TOKEN } from '../util/constants';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(ID_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const uploadLink = createUploadLink({
  uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
});
const client = new ApolloClient({
  link: ApolloLink.from([
    // @ts-ignore
    onError(({ graphQLErrors, operation, forward }) => {
      if (graphQLErrors && graphQLErrors[0]?.message === 'JWT Token Expired.') {
        return new Observable<FetchResult<{ [key: string]: any }, Record<string, any>, Record<string, any>>>(
          (observer) => {
            Auth.currentSession()
              .then((session) => {
                localStorage.setItem(ACCESS_TOKEN, session.getAccessToken().getJwtToken());
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${session.getAccessToken().getJwtToken()}`,
                  },
                });
                return forward(operation);
              })
              .then(() => {
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };
                // Retry last failed request
                return forward(operation).subscribe(subscriber);
              })
              .catch((error) => {
                // No refresh or client token available, we force user to login
                observer.error(error);
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(ID_TOKEN);
                // Redirect to the /sign-in route, keeping the template route portion of the url
                // i.e. Redirect to https://start.liiingo.com/myhomegroup/sign-in or https://start.liiingo.com/liiingo/sign-in
                window.location.href = `${window.location.href
                  .split('/')
                  .slice(0, 4)
                  .join('/')}/sign-in?sessionExpired=true`;
              });
          }
        );
      } else {
        return forward(operation);
      }
    }),
    authLink,
    uploadLink,
  ]),
  cache: new InMemoryCache(),
});

export { client };
