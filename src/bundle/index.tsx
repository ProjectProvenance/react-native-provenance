import * as React from 'react';

import { View, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { bundleUrl } from '../api';
import type {
  WebViewErrorEvent,
  WebViewMessageEvent,
} from 'react-native-webview/lib/WebViewTypes';
import ErrorBoundary from '../ErrorBoundary';
import * as Errors from '../services/Errors';

const handleShouldStartLoadWithRequest = (request: any) => {
  // Intercept URL loading
  const { url } = request;

  // Check if the URL should be opened in the external browser
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (request.navigationType === 'click') {
      Linking.openURL(url);
      return false; // Prevent the WebView from loading the URL
    }
  }

  // Allow the WebView to load the URL
  return true;
};

type Callback = () => void;
type onResizedCallback = (newSize: number) => void;
type BundleProps = {
  bundleId: string;
  sku: string;
  colorScheme?: 'light' | 'dark';
  onModalShown?: Callback;
  onModalClosed?: Callback;
  onResized?: onResizedCallback;
};

export const minModalHeight = 540;

export const loadingHeight = 175;

function BundleComponent({
  bundleId,
  sku,
  onModalShown,
  onModalClosed,
  onResized,
}: BundleProps) {
  const [proofPointsHeight, setProofPointsHeight] =
    React.useState(loadingHeight);
  const webview = React.useRef<WebView | null>(null);

  return (
    <View style={styles.webViewContainer}>
      <WebView
        ref={(r: any) => (webview.current = r)}
        source={{ uri: bundleUrl(bundleId, sku) }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        nestedScrollEnabled={true}
        onError={(syntheticEvent: WebViewErrorEvent) => {
          const { nativeEvent } = syntheticEvent;
          Errors.handle(`WebView error: ${nativeEvent}`);
        }}
        injectedJavaScript={`
          window.ReactNativeWebView.postMessage("JS injected");

          const selectors = {
            modal: '#provenance-modal',
            bundleContainer: '.EmbedWrapper'
          };

          let modalShown = false;
          let prevBundleSize = 0;

          setInterval(() => {
            const modalElement = document.querySelector(selectors.modal);
            if (modalElement && modalElement.dataset.state !== 'drawer-closed') {
              if (!modalShown) {
                modalShown = true;
                window.ReactNativeWebView.postMessage("modalShown");
              }
            } else {
              if (modalShown) {
                modalShown = false;
                window.ReactNativeWebView.postMessage("modalClosed");
              } else {
                const bundleContainerElement = document.querySelector(selectors.bundleContainer);
                if (bundleContainerElement && bundleContainerElement.clientHeight > 0 && prevBundleSize != bundleContainerElement.clientHeight) {
                  prevBundleSize = bundleContainerElement.clientHeight;
                  window.ReactNativeWebView.postMessage("bundleResized: " + bundleContainerElement.clientHeight);
                }
              }
            }
          }, 300);
        `}
        onMessage={(event: WebViewMessageEvent) => {
          console.log('message received', event.nativeEvent.data);
          const message = event.nativeEvent.data;
          if (message === 'modalShown') {
            if (onResized) onResized(minModalHeight);
            if (onModalShown) onModalShown();
          }

          if (message === 'modalClosed') {
            if (onResized) onResized(proofPointsHeight);
            if (onModalClosed) onModalClosed();
          }

          let newBundleSize = null;
          if (
            message.startsWith('bundleResized') &&
            (newBundleSize = message.split(': ')[1])
          ) {
            const newHeight = parseInt(newBundleSize, 10);
            setProofPointsHeight(newHeight);
            if (onResized) onResized(newHeight);
          }
        }}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      />
    </View>
  );
}

export function Bundle(props: BundleProps) {
  return (
    <ErrorBoundary fallback="Something went wrong">
      <BundleComponent {...props} />
    </ErrorBoundary>
  );
}

// Neutral default
const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});
