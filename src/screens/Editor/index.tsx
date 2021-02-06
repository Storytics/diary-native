import React, { createRef } from "react";
import { Button, ScrollView, View, Text } from "react-native";
// Utils
import { SafeAreaView } from "react-native-safe-area-context";
import sanitize from "xss";
// Types
import { EditorScreenNavigationProp } from "navigation/types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesome5 } from "@expo/vector-icons";

import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

function unescapeHtml(html: string) {
  return html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

interface Props {
  navigation: EditorScreenNavigationProp;
}

const EditorScreen: React.FC<Props> = ({ navigation }) => {
  const RichTextRef = createRef<RichEditor>();
  const RichTextViewRef = createRef<RichEditor>();

  return (
    <SafeAreaView>
      <Button title="Go Back" onPress={() => navigation.navigate("Home")} />

      <ScrollView style={{ height: 500 }}>
        <RichToolbar
          editor={RichTextRef}
          disabled={false}
          iconTint="purple"
          selectedIconTint="pink"
          disabledIconTint="purple"
          actions={[
            actions.setBold,
            actions.setItalic,
            "underline",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.undo,
          ]}
          iconMap={{
            [actions.insertOrderedList]: ({ tintColor }) => (
              <FontAwesome5 name="list-ul" size={16} color={tintColor} />
            ),
          }}
        />

        <Text>Editable</Text>
        <View style={{ height: 200, padding: 10 }}>
          <RichEditor
            ref={RichTextRef}
            placeholder="Start Writing Here"
            initialFocus={false}
            disabled={false}
            useContainer={false}
            onChange={(text: string) =>
              console.log(
                "text = ",
                sanitize(text, { whiteList: { div: ["style"] } })
              )
            }
            editorInitializedCallback={() =>
              console.log("o Editor esta pronto")
            }
            onHeightChange={(height: number) =>
              console.log("altura mudou = ", height)
            }
          />
        </View>

        <Text>Read Only</Text>
        <View style={{ height: 100, padding: 10 }}>
          <RichEditor
            ref={RichTextViewRef}
            placeholder="Start Writing Here"
            disabled
            initialContentHTML={unescapeHtml(
              `<div>&lt;b&gt;cena&lt;/b&gt; isto a &lt;i&gt;dar&lt;/i&gt;&nbsp;</div><div>&lt;br&gt;</div><div style="text-align:right;">agira &lt;u&gt;sim&lt;/u&gt;</div>`
            )}
            useContainer={false}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Button
            title="Set Html"
            onPress={() =>
              RichTextViewRef.current?.setContentHTML(
                sanitize(
                  unescapeHtml(
                    `<div>&lt;b&gt;cena&lt;/b&gt; isto a &lt;i&gt;dar&lt;/i&gt;&nbsp;</div><div>&lt;br&gt;</div><div style="text-align:right;">agira &lt;u&gt;sim&lt;/u&gt;</div>`
                  )
                )
              )
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditorScreen;
