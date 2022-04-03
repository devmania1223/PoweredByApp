export const graphqlRequestLogger = {
  // Note: The graphQLRequestContext object is different than the "AppContext" that gets passed into resolver functions.
  // The "Request Context" contains info about the inbound request (like headers)
  // https://www.apollographql.com/docs/apollo-server/integrations/plugins/
  requestDidStart: (graphQLRequestContext: any) => {
    graphQLRequestContext.logger.info({
      req: {
        url: '/graphql',
        msg:
          // Regex notes: replace newline with space, then replace multiple consecutive spaces with a single space (collapse whitespace)
          graphQLRequestContext.request?.query?.replace(/\n/g, ' ').replace(/( ){2,}/g, ' '),
        headers: graphQLRequestContext.context?.request?.header,
      },
    });
  },
};
