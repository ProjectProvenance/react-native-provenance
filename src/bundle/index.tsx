import * as React from 'react';

import { View, StyleSheet, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { bundleUrl } from '../api';
import type {
  WebViewErrorEvent,
  WebViewMessageEvent,
} from 'react-native-webview/lib/WebViewTypes';

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
const modalHeight = 540;

export const startingHeight = 175;

export function Bundle({
  bundleId,
  sku,
  colorScheme = 'light',
  onModalShown,
  onModalClosed,
  onResized,
}: BundleProps) {
  const [proofPointsHeight, setProofPointsHeight] =
    React.useState(startingHeight);
  const webview = React.useRef<WebView | null>(null);

  // console.log('Current color scheme:', colorScheme);
  // if (webview.current) {
  //   console.log('Setting color scheme to:', colorScheme);
  //   webview.current?.injectJavaScript(
  //     `window.Provenance.setTheme(${colorScheme}); true;`
  //   );
  // }

  // @TODO: For some reason appearance doesn't pick up color scheme changes
  // https://reactnative.dev/docs/appearance?guide=android#addchangelistener
  // Appearance.addChangeListener(({ colorScheme }) => {
  //   console.log("Color scheme changed:", colorScheme);
  //   this.webview?.injectJavaScript(`window.Provenance.setTheme(${colorScheme}); true;`);
  // });

  // setTimeout(() => {
  //   webview.current.injectJavaScript(`window.Provenance.setTheme('dark'); true;`);
  // }, 5000);

  // setTimeout(() => {
  //   webview.current.injectJavaScript(`window.Provenance.setTheme('light'); true;`);
  // }, 15000);

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
          console.warn('WebView error: ', nativeEvent);
        }}
        injectedJavaScript={`
          window.ReactNativeWebView.postMessage("JS injected");

          let modalShown = false;
          let prevBundleSize = 0;

          setInterval(() => {
            const modalElement = document.querySelector('#provenance-modal');
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
                const bundleContainerElement = document.querySelector('provenance-bundle > div');
                if (bundleContainerElement && bundleContainerElement.clientHeight > 0 && prevBundleSize != bundleContainerElement.clientHeight) {
                  prevBundleSize = bundleContainerElement.clientHeight;
                  window.ReactNativeWebView.postMessage("bundleResized: " + bundleContainerElement.clientHeight);
                }
              }
            }
          }, 300);

          // an API that will be defined in the app side, and only invoked here
          window.Provenance = {
            setTheme: (theme) => {
              if (theme === 'dark') {
                document.body.style.backgroundColor = '#71797E';
              } else {
                document.body.style.backgroundColor = 'white';
              }
            },

            setFontSize: (fontSize) => {
              // changes font size to respond to accessibility info
            }
          };

          window.Provenance.setTheme(${colorScheme});
        `}
        onMessage={(event: WebViewMessageEvent) => {
          console.log('message received', event.nativeEvent.data);
          const message = event.nativeEvent.data;
          if (message === 'modalShown') {
            if (onResized) onResized(modalHeight);
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
            const newHeight = parseInt(newBundleSize, 10) + 20;
            setProofPointsHeight(newHeight);
            if (onResized) onResized(newHeight);
          }
        }}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
      />
    </View>
  );
}

// Neutral default
const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});
