import React, { forwardRef, useImperativeHandle } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import sanitize from "xss";
import useEditorContext from "hooks/useEditorContext";
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
  const { dispatch, state } = useEditorContext();

  let WebViewRef: WebView;

  const passToEditor = (event: string, customJS?: boolean) => {
    const command = customJS
      ? event
      : `document.execCommand('${event}'); true;`;
    WebViewRef.injectJavaScript(command);
  };
  useImperativeHandle(passRef, () => ({ passToEditor }));

  const onHandleMessage = (event: WebViewMessageEvent) => {
    if (event.nativeEvent.data.includes("//isSelection://")) {
      const selection = event.nativeEvent.data.split("//isSelection://")[1];
      if (!selection.includes('id="textEditor"')) {
        const isBold = selection.includes("<b>");
        const isItalic = selection.includes("<i>");
        const isUnderline = selection.includes("<iu");

        if (state.bold !== isBold) {
          dispatch({
            type: "bold",
            payload: { active: isBold },
          });
        }
        if (state.italic !== isItalic) {
          dispatch({
            type: "italic",
            payload: { active: isItalic },
          });
        }

        if (state.underline !== isUnderline) {
          dispatch({
            type: "underline",
            payload: { active: isUnderline },
          });
        }
      }
    } else {
      props.onContentChange(event.nativeEvent);
    }
  };
  return (
    <WebView
      ref={(ref: WebView) => {
        WebViewRef = ref;
      }}
      originWhitelist={["*"]}
      source={{
        html: EditorHtml({
          data: sanitize(props.content || ""),
          contentEditable: String(props.isContentEditable),
        }),
      }}
      onMessage={onHandleMessage}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
});

export default Editor;
