import React, { useCallback, useState } from "react";
import { Platform } from "react-native";
import { WebView, WebViewProps } from "react-native-webview";

const injectScript = `
  const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
  (function () {
    window.onclick = function(e) {
      e.preventDefault();
      window.ReactNativeWebView.postMessage(e.target.href);
      e.stopPropagation()
    }
  }());
`;

interface Props extends WebViewProps {
  onChangeLoading: (state: boolean) => void;
}

const CustomHeaderWebView = React.forwardRef(
  ({ onChangeLoading, source, ...rest }: Props, ref) => {
    // @ts-ignore
    const [currentURI, setURI] = useState(source.uri);
    const newSource = { ...source, uri: currentURI };

    const onLoading = useCallback(
      (state: boolean) => {
        setTimeout(() => {
          onChangeLoading(state);
        }, 2000);
      },
      [onChangeLoading]
    );

    // @ts-ignore
    const onShouldStartLoadWithRequest = (request) => {
      // If we're loading the current URI, allow it to load
      if (request.url === currentURI) return true;
      // We're loading a new URL -- change state first
      setURI(request.url);
      return false;
    };

    const config =
      Platform.OS === "android"
        ? {
            onShouldStartLoadWithRequest,
            ...rest,
          }
        : { ...rest };

    return (
      <WebView
        // @ts-ignore
        ref={ref}
        source={newSource}
        onLoad={() => onLoading(false)}
        onError={() => onLoading(false)}
        injectedJavaScript={injectScript}
        {...config}
      />
    );
  }
);

export default CustomHeaderWebView;
