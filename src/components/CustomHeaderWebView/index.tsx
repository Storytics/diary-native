import React, { useState } from "react";
import { WebView, WebViewProps } from "react-native-webview";

const CustomHeaderWebView = React.forwardRef((props: WebViewProps, ref) => {
  // @ts-ignore
  const [currentURI, setURI] = useState(props.source.uri);

  return (
    <WebView
      // @ts-ignore
      ref={ref}
      source={{ ...props.source, uri: currentURI }}
      onShouldStartLoadWithRequest={(request) => {
        if (request.url !== currentURI) {
          setURI(request.url);
        }
        return true;
      }}
      {...props}
    />
  );
});

export default CustomHeaderWebView;
