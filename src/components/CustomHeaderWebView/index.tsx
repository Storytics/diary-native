import React, { useCallback, useState } from "react";
import { WebView, WebViewProps } from "react-native-webview";

const injectScript = `
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

    return (
      <WebView
        // @ts-ignore
        ref={ref}
        source={newSource}
        onShouldStartLoadWithRequest={(request) => {
          // If we're loading the current URI, allow it to load
          if (request.url === currentURI) return true;
          // We're loading a new URL -- change state first
          setURI(request.url);
          return false;
        }}
        onLoad={() => onLoading(false)}
        onError={() => onLoading(false)}
        injectedJavaScript={injectScript}
        {...rest}
      />
    );
  }
);

export default CustomHeaderWebView;
