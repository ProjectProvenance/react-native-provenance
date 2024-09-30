import * as React from 'react';

import { View, StyleSheet, Linking, useWindowDimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { bundleUrl, getClientHeaders } from '../api';
import type { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';
import { webviewErrorHandler } from './webviewErrorHandler';
import { Widget } from '../Widget';

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
  sku: string;
  colorScheme?: 'light' | 'dark';
  onModalShown?: Callback;
  onModalClosed?: Callback;
  onResized?: onResizedCallback;
};

export const minModalHeight = 540;

export const loadingHeight = 175;

function BundleComponent({
  sku,
  onModalShown,
  onModalClosed,
  onResized,
}: BundleProps) {
  const { fontScale } = useWindowDimensions();
  const [proofPointsHeight, setProofPointsHeight] =
    React.useState(loadingHeight);
  const webview = React.useRef<WebView | null>(null);

  const normalizedScale = Math.max(Math.min(fontScale, 1.25), 1.0);
  const scalingStatement = `document.body.style.zoom = ${normalizedScale};`;
  React.useEffect(() => {
    if (webview.current) {
      webview.current.injectJavaScript(`
        ${scalingStatement}
        true;
      `);
    }
  }, [scalingStatement]);

  return (
    <View style={styles.webViewContainer}>
      <WebView
        ref={(r: any) => (webview.current = r)}
        source={{
          uri: bundleUrl(sku),
          // There's no way to unit test Webview. So uncomment the following lines to test manually
          // uri: 'https://wrongdomainlol.io',
          // uri: 'https://staging.provenance.org/webviews/123/123',
          headers: {
            ...getClientHeaders(),
          },
        }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        nestedScrollEnabled={true}
        scalesPageToFit={false}
        setBuiltInZoomControls={false}
        textZoom={100}
        onError={webviewErrorHandler('WebViewErrorEvent')}
        onHttpError={webviewErrorHandler('WebViewHttpErrorEvent')}
        onRenderProcessGone={webviewErrorHandler(
          'WebViewRenderProcessGoneEvent'
        )}
        injectedJavaScript={`
          window.ReactNativeWebView.postMessage("JS injected");

          ${scalingStatement}

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
            const newHeight = parseInt(newBundleSize, 10) * normalizedScale;
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
    <Widget fallbackOnError="Something went wrong">
      <BundleComponent {...props} />
    </Widget>
  );
}

// Neutral default
const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});
