import React, { forwardRef, useImperativeHandle } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import EditorHtml from "./EditorHTML";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onContentChange: (event: any) => void;
  content?: string;
  isContentEditable?: boolean;
}

type Events =
  | string
  | "bold"
  | "underline"
  | "italic"
  | "justifyLeft"
  | "justifyCenter"
  | "justifyFull"
  | "justifyRight"
  | "insertUnorderedList"
  | "insertOrderedList";

export interface EditorRef {
  passToEditor: (event: Events, customJS?: boolean) => void;
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
      source={{
        html: EditorHtml({
          data: props.content || "",
          contentEditable: String(props.isContentEditable),
        }),
      }}
      onMessage={(event: WebViewMessageEvent) => {
        if (props.onContentChange) {
          props.onContentChange(event.nativeEvent);
        }
      }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
});

export default Editor;
