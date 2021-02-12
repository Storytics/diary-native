import React, { createRef } from "react";
import { Button, ScrollView, View, Text } from "react-native";
import { useTheme } from "styled-components/native";
// Components
import { MaterialIcons } from "@expo/vector-icons";
import { FakeButton } from "components/RoundButton";
// Utils
import { SafeAreaView } from "react-native-safe-area-context";
import sanitize from "xss";
// Types
import { EditorScreenNavigationProp } from "navigation/types";

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

const toolBarActions: Array<{
  id: string;
  name: keyof typeof MaterialIcons.glyphMap;
}> = [
  {
    id: "justifyLeft",
    name: "format-align-left",
  },
  {
    id: "justifyCenter",
    name: "format-align-justify",
  },
  {
    id: "justifyRight",
    name: "format-align-right",
  },
  {
    id: "bold",
    name: "format-bold",
  },
  {
    id: "italic",
    name: "format-italic",
  },
  {
    id: "underline",
    name: "format-underline",
  },
];

const EditorScreen: React.FC<Props> = ({ navigation }) => {
  const RichTextRef = createRef<RichEditor>();
  const RichTextViewRef = createRef<RichEditor>();
  const theme = useTheme();

  const iconMap = toolBarActions.reduce(
    (o, item) => ({
      ...o,
      [item.id]: ({
        tintColor,
        selected,
        iconSize,
        iconGab,
      }: {
        tintColor: string;
        selected: boolean;
        iconSize: number;
        iconGab: number;
      }) => {
        return (
          <FakeButton
            size="medium"
            backgroundColor={
              selected
                ? theme.toolBox.button.active.backgroundColor
                : theme.toolBox.button.default.backgroundColor
            }
          >
            <MaterialIcons name={item.name} size={iconSize} color={tintColor} />
          </FakeButton>
        );
      },
    }),
    {}
  );

  return (
    <SafeAreaView>
      <Button title="Go Back" onPress={() => navigation.navigate("Home")} />

      <ScrollView style={{ height: 500 }}>
        <RichToolbar
          style={{ backgroundColor: "white", height: 68 }}
          flatContainerStyle={{ backgroundColor: "red" }}
          editor={RichTextRef}
          disabled={false}
          iconTint={theme.toolBox.button.default.iconColor}
          selectedIconTint={theme.toolBox.button.active.iconColor}
          iconSize={24}
          actions={[
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "bold",
            "italic",
            "underline",
          ]}
          iconMap={iconMap}
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
