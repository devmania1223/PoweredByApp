import React from 'react';
import { theme } from '../src/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from '../src/context/AppContext';
import { ApolloProvider } from '@apollo/client/react/context';
import { client } from '../src/services/apollo';
import { Elements } from '@stripe/react-stripe-js';
import { GoogleTagManagerProvider } from '../src/util/GoogleTagManagerProvider';

const testStripePromise = new Promise(() => {});

export const parameters = {
  // actions: { argTypesRegex: '^on[A-Z].*' },
};

/**
 * These decorators will be wrapped around _every_ story.
 */
export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
  (Story) => (
    <Router>
      <Story />
    </Router>
  ),
  (Story) => (
    <AppContextProvider>
      <Story />
    </AppContextProvider>
  ),
  (Story) => (
    <ApolloProvider client={client}>
      <Story />
    </ApolloProvider>
  ),
  (Story) => (
    <Elements stripe={testStripePromise}>
      <Story />
    </Elements>
  ),
  (Story) => (
    <GoogleTagManagerProvider gtmId="" gtmAuth="" gtmPreview="">
      <Story />
    </GoogleTagManagerProvider>
  ),
];
