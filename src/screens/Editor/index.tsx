import React, { createRef } from "react";
import { Button, ScrollView, View } from "react-native";
// Components
import EditorToolbar from "components/Editor/EditorToolbar";
import Editor, { EditorRef } from "components/Editor/index";
// Utils
import { SafeAreaView } from "react-native-safe-area-context";
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
          onButtonPress={(event, customJS) =>
            richTextEditorRef.current?.passToEditor(event, customJS)
          }
        />
        <View style={{ height: 200, padding: 10 }}>
          <Editor
            ref={richTextEditorRef}
            onContentChange={(event) => console.log(event.data)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditorScreen;
