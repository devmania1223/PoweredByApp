import { ApolloError } from '@apollo/client/errors';
import Bugsnag from '@bugsnag/js';
import { AlertProps } from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
export const ErrorContext = React.createContext<Partial<ErrorContextType>>({});

type ErrorContextType = {
  errorMessage: string;
  errorTitle: string;
  errorSeverity: AlertProps['severity'];
  clearError: () => void;
  useErrorResetOnNavigate: () => void;
  handleError: (error: string | ApolloError) => void;
};

export const ErrorContextProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const [errorSeverity, setErrorSeverity] = useState<AlertProps['severity']>('error');

  const defaultErrorTitle = 'Something went wrong';
  const defaultErrorSeverity = 'error' as AlertProps['severity'];

  const clearError = () => {
    setErrorMessage(null);
    setErrorTitle(null);
    setErrorSeverity(defaultErrorSeverity);
  };

  // This is a custom hook that will clear the error state when the react-router 'location' changes.
  // For this to work properly, the <ErrorContextProvider> needs to be inside the <BrowserRouter> provider.
  const useErrorResetOnNavigate = () => {
    let location = useLocation();
    useEffect(() => {
      clearError();
    }, [location]);
  };

  const handleError = (error: string | ApolloError) => {
    Bugsnag.notify(error);

    if (isApolloError(error)) {
      handleApolloError(error);
    } else if (isStringError(error)) {
      handleStringError(error);
    } else {
      console.error('Unrecognized error type');
    }
  };

  const handleStringError = (message: string) => {
    setErrorMessage(message);
    setErrorTitle(defaultErrorTitle);
    setErrorSeverity(defaultErrorSeverity);
  };

  const handleApolloError = (error: ApolloError) => {
    setErrorMessage(error.message);
    setErrorTitle(error.name);
    setErrorSeverity(defaultErrorSeverity);
  };

  const context: ErrorContextType = {
    errorMessage,
    errorTitle,
    errorSeverity,
    clearError,
    useErrorResetOnNavigate,
    handleError,
  };

  return <ErrorContext.Provider value={context}>{children}</ErrorContext.Provider>;
};

function isApolloError(error: any): error is ApolloError {
  return error instanceof ApolloError;
}

function isStringError(error: any): error is string {
  return typeof error === 'string';
}
