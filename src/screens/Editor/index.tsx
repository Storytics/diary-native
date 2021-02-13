import React, { createRef } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
// Components
import CustomSafeArea from "components/CustomSafeArea";
import NoteBook from "components/NoteBook";
import { FakeButton } from "components/RoundButton";
// Utils
import sanitize from "xss";
import { useKeyboard } from "utils/hooks";
// Types
import { EditorScreenNavigationProp } from "navigation/types";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import Header from "components/Header";
import Theme from "theme/index";
// styled components
import { ContentWrapper, ToolBarWrapper, EditorContainer } from "./styles";

function unescapeHtml(html: string) {
  return html.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

interface Props {
  navigation: EditorScreenNavigationProp;
  route: {
    params: {
      noteBookHeight: number;
    };
  };
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

const styles = (theme: typeof Theme) =>
  StyleSheet.create({
    // Tool Bar
    richToolBarContainer: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    // Normal state
    richToolBar: {
      backgroundColor: theme.toolBar.backgroundColor,
      height: 60,
      borderRadius: 30,
    },
    // Add shadow when writing
    richToolBarFloating: {
      backgroundColor: theme.toolBar.backgroundColor,
      height: 60,
      borderRadius: 30,
      shadowColor: theme.toolBar.shadowColor,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    // Icons wrapper
    flatContainer: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: 10,
      paddingLeft: 10,
    },
    // Container inside a scroll view
    scrollViewContent: {
      display: "flex",
      flexGrow: 1,
    },
  });

const EditorScreen: React.FC<Props> = ({ navigation, route }) => {
  const RichTextRef = createRef<RichEditor>();
  // const RichTextViewRef = createRef<RichEditor>();
  // Keyboard Hook
  const { isKeyboardOpen } = useKeyboard();
  const theme = useTheme();

  const iconMap = toolBarActions.reduce(
    (o, item) => ({
      ...o,
      [item.id]: ({
        tintColor,
        selected,
        iconSize,
      }: {
        tintColor: string;
        selected: boolean;
        iconSize: number;
      }) => {
        return (
          <FakeButton
            size="medium"
            backgroundColor={
              selected
                ? theme.toolBar.button.active.backgroundColor
                : theme.toolBar.button.default.backgroundColor
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
    <CustomSafeArea>
      <KeyboardAvoidingView style={{ flexGrow: 1 }}>
        <ContentWrapper isKeyboardOpen={false}>
          <Header
            hasBackButton
            onPress={() => {
              navigation.navigate("Home");
            }}
            text="Story's"
          />

          <NoteBook
            noteBookHeight={route.params.noteBookHeight}
            hasPaddingBottom={false}
            page={1}
            date="12 Jan 2021"
            day="Friday"
          >
            <EditorContainer>
              <RichEditor
                ref={RichTextRef}
                editorStyle={{
                  backgroundColor: theme.richEditor.backgroundColor,
                  color: theme.richEditor.textColor,
                  placeholderColor: theme.richEditor.placeholderColor,
                  contentCSSText: `font-family: sans-serif; font-size: 14px; padding: 0; line-height: 40px;`,
                }}
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
            </EditorContainer>
          </NoteBook>

          {/* ToolBar */}
          <ToolBarWrapper isKeyboardOpen={false}>
            <View style={styles(theme).richToolBarContainer}>
              <RichToolbar
                style={
                  isKeyboardOpen
                    ? styles(theme).richToolBarFloating
                    : styles(theme).richToolBar
                }
                // @ts-ignore
                flatContainerStyle={styles(theme).flatContainer}
                editor={RichTextRef}
                disabled={false}
                iconTint={theme.toolBar.button.default.iconColor}
                selectedIconTint={theme.toolBar.button.active.iconColor}
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
            </View>
          </ToolBarWrapper>
          {/* TODO make navigation bar the same height as tool bar */}

          {/*
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
            */}
        </ContentWrapper>
      </KeyboardAvoidingView>
    </CustomSafeArea>
  );
};

export default EditorScreen;
