import React, { createRef } from "react";
import { Button, ScrollView, View } from "react-native";
// Components
import EditorToolbar from "components/Editor/EditorToolbar";
import Editor, { EditorRef } from "components/Editor/index";
// Utils
import { SafeAreaView } from "react-native-safe-area-context";
import sanitize from "xss";
// Types
import { EditorScreenNavigationProp } from "navigation/types";

interface Props {
  navigation: EditorScreenNavigationProp;
}

const EditorScreen: React.FC<Props> = ({ navigation }) => {
  const richTextEditorRef = createRef<EditorRef>();

  return (
    <SafeAreaView>
      <Button title="Go Back" onPress={() => navigation.navigate("Home")} />
      <ScrollView style={{ height: 500 }}>
        <EditorToolbar
          bold
          italic
          underline
          justifyLeft
          justifyCenter
          justifyRight
          onToolPress={(event, customJS) =>
            richTextEditorRef.current?.passToEditor(event, customJS)
          }
        />
        <View style={{ height: 400, padding: 10 }}>
          <Editor
            ref={richTextEditorRef}
            content=""
            isContentEditable
            onContentChange={(event) => console.log(sanitize(event.data))}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditorScreen;
