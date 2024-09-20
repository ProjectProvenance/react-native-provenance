import React, { type FC, type ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { isConfigured } from './api';
import * as Errors from './services/Errors';

// Every component we expose to the client app must be wrapped in the Widget to provide
// consistent error boundary, API, theming, localization, accessibility contexts
export const Widget: FC<{ children: ReactNode; fallbackOnError?: string }> = ({
  children,
  fallbackOnError,
}) => {
  return (
    <ErrorBoundary fallback={fallbackOnError}>
      <ApiProvider>{children}</ApiProvider>
    </ErrorBoundary>
  );
};

const ApiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // @TODO: Maybe pass api client down the tree as provider's value
  if (!isConfigured()) {
    Errors.handle(
      'Configuration missing. You must call `configure` first before rendering any of our components.'
    );

    return <></>;
  }

  return <>{children}</>;
};
