import { ApolloProvider } from '@apollo/client/react/context';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppContextProvider } from './context/AppContext';
import { ErrorContextProvider } from './context/ErrorContext';
import { OnboardingFlowContextProvider } from './context/OnboardingFlowContext';
import reportWebVitals from './reportWebVitals';
import { client } from './services/apollo';
import { ErrorBoundary } from './services/bugsnag';
import store, { history } from './store/store';
import { theme } from './theme';
import { GoogleTagManagerProvider } from './util/GoogleTagManagerProvider';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

ReactDOM.render(
  <ErrorBoundary>
    <GoogleTagManagerProvider
      gtmId={process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID}
      gtmAuth={process.env.REACT_APP_GOOGLE_TAG_MANAGER_ENVIRONMENT_AUTH}
      gtmPreview={process.env.REACT_APP_GOOGLE_TAG_MANAGER_ENVIRONMENT_PREVIEW}
    >
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ConnectedRouter history={history}>
            {/* place ConnectedRouter under Provider */}
            <AppContextProvider>
              <Elements stripe={stripePromise}>
                <ApolloProvider client={client}>
                  <OnboardingFlowContextProvider>
                    <ErrorContextProvider>
                      <App />
                    </ErrorContextProvider>
                  </OnboardingFlowContextProvider>
                </ApolloProvider>
              </Elements>
            </AppContextProvider>
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    </GoogleTagManagerProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
