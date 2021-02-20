import React, { createRef, useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTheme } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
// Components
import CustomSafeArea from "components/CustomSafeArea";
import NoteBook from "components/NoteBook";
import { FakeButton } from "components/RoundButton";
// Utils
import sanitize from "xss";
import useKeyboard from "hooks/useKeyboard";
import dayjs from "dayjs";
// Types
import { EditorNavigationProps } from "types/navigation";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import Header from "components/Header";
import Theme from "theme/index";
// Database
import { createPage, updatePageById } from "database/Page";
import { getAllActivity } from "database/Book";
import { unescapeHtml } from "utils/functions";
// Context
import useStore from "hooks/useStore";
// styled components
import {
  Container,
  ContentWrapper,
  ToolBarWrapper,
  EditorContainer,
} from "./styles";

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
      paddingTop: 30,
    },
    keyboardAvoidingView: {
      display: "flex",
      flexGrow: 1,
    },
  });

const EditorScreen: React.FC<EditorNavigationProps> = ({
  navigation,
  route: { params },
}) => {
  const [content, setContent] = useState(params.page?.content || "");
  const RichTextRef = createRef<RichEditor>();
  // Keyboard Hook
  const { isKeyboardOpen } = useKeyboard();
  const theme = useTheme();
  const { dispatch } = useStore();

  // Scroll Ref - scroll initial to top
  const noteBookScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isKeyboardOpen) {
      noteBookScrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
  }, [isKeyboardOpen]);

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

  const refreshActivities = async () => {
    try {
      const activity = await getAllActivity();
      dispatch({
        type: "LOAD_ACTIVITY",
        payload: { activity },
      });
    } catch (e) {
      console.log("Error refreshing activities ", e);
    }
  };

  const onSave = async () => {
    try {
      // create a new page
      if (content && !params.isEdit) {
        const res = await createPage(content, params.bookId);
        if (res === "success") {
          await refreshActivities();
        }
      }

      // Save a existing page
      if (content && params.isEdit && params.page) {
        const res = await updatePageById(params.page.id, content);
        if (res === "success") {
          await refreshActivities();
        }
      }

      navigation.navigate("Diary", {
        bookId: params.bookId,
        bookTitle: params.bookTitle,
        activityPageId: params.pageNumber,
      });
    } catch (e) {
      if (params.isEdit) {
        console.log("Error editing the page = ", e);
      } else {
        console.log("Error saving the page = ", e);
      }
    }
  };

  const getDate =
    params.isEdit && params.page ? params.page.createdAt : dayjs();

  return (
    <CustomSafeArea>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles(theme).keyboardAvoidingView}
        keyboardVerticalOffset={30}
      >
        <Container isKeyboardOpen={isKeyboardOpen}>
          <ScrollView
            contentContainerStyle={styles(theme).scrollViewContent}
            ref={noteBookScrollRef}
          >
            <Header hasBackButton onPress={onSave} text={params.bookTitle} />
            <ContentWrapper>
              <NoteBook
                hasPaddingBottom={false}
                page={params.pageNumber.toString() || "0"}
                date={dayjs(getDate).format("DD MMM YYYY")}
                day={dayjs(getDate).format("dddd")}
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
                    initialContentHTML={unescapeHtml(content)}
                    onChange={(text: string) =>
                      setContent(
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
            </ContentWrapper>
          </ScrollView>
          {/* ToolBar */}
          <ToolBarWrapper isKeyboardOpen={isKeyboardOpen}>
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
        </Container>
      </KeyboardAvoidingView>
    </CustomSafeArea>
  );
};

export default EditorScreen;
