import React, { forwardRef, useImperativeHandle } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import EditorHtml from "./EditorHTML";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onContentChange: (event: any) => void;
}

export interface EditorRef {
  passToEditor: (
    event:
      | string
      | "bold"
      | "underline"
      | "italic"
      | "justifyLeft"
      | "justifyCenter"
      | "justifyFull"
      | "justifyRight"
      | "insertUnorderedList"
      | "insertOrderedList",
    customJS?: boolean
  ) => void;
}

const Editor = forwardRef<EditorRef, Props>((props, passRef) => {
  let WebViewRef: WebView;

  const passToEditor = (event: string, customJS?: boolean) => {
    const command = customJS
      ? event
      : `document.execCommand('${event}'); true;`;
    WebViewRef.injectJavaScript(command);
  };
  useImperativeHandle(passRef, () => ({ passToEditor }));
  return (
    <WebView
      ref={(ref: WebView) => {
        WebViewRef = ref;
      }}
      originWhitelist={["*"]}
      source={{ html: EditorHtml }}
      onMessage={(event: WebViewMessageEvent) => {
        if (props.onContentChange) {
          props.onContentChange(event.nativeEvent);
        }
      }}
      showsHorizontalScrollIndicator
      showsVerticalScrollIndicator
    />
  );
});

export default Editor;
