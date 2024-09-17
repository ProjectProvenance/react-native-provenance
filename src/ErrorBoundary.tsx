import React, { Component, type ReactNode } from 'react';
import * as Errors from './services/Errors';
import { Text } from 'react-native';

type ErrorBoundaryProps = {
  fallback?: string;
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // This method is called when a child component throws an error
  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    // Update state to show the fallback UI
    return { hasError: true };
  }

  // This method is called to log the error or perform side effects
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Errors.handle(
      ['Error caught by ErrorBoundary:', error, errorInfo].join('; ')
    );
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.fallback && <Text>{this.props.fallback}</Text>}</>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
