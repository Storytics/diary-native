import React, { createRef, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userEditorDraftItem } from "utils/constants";
import uuid from "uuid-random";
// Types
import { EditorNavigationProps } from "types/navigation";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import Header from "components/Header";
import Theme from "theme/index";
// Database
import { createPage, updatePageById } from "database/Page";
import { unescapeHtml } from "utils/functions";
// Context
import useStore from "hooks/useStore";
// Hooks
import useNotification from "hooks/useNotification";
import useDebounce from "hooks/useDebounce";
// Types
import { NotificationType } from "types/notifications";
// Locales
import i18n from "locales/index";
// Context
import { loadActivity } from "context/StoreContext";
// Screens shared styles
import { EditorContainer } from "../styles";
// Styled components
import {
  Container,
  ContentWrapper,
  ToolBarWrapper,
  HeaderContainer,
  HeaderKeepSpacer,
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
    // Normal state
    richToolBar: {
      backgroundColor: theme.toolBar.backgroundColor,
      height: 50,
      borderRadius: 25,
    },
    // Icons wrapper
    flatContainer: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingRight: 5,
      paddingLeft: 5,
    },
    keyboardAvoidingView: {
      display: "flex",
      flexGrow: 1,
    },
  });

const AnimatedHeader = Animated.createAnimatedComponent(HeaderContainer);

const EditorScreen: React.FC<EditorNavigationProps> = ({
  navigation,
  route: { params },
}) => {
  const headerAnimation = useRef(new Animated.Value(1)).current;
  const [editorHeight, setEditorHeight] = useState(40);
  const [isEditorLoading, setEditorLoading] = useState(true);
  const [content, setContent] = useState(params.page?.content || "");
  const RichTextRef = createRef<RichEditor>();
  // Keyboard Hook
  const { isKeyboardOpen } = useKeyboard();
  const theme = useTheme();
  const { dispatch } = useStore();
  const { notification } = useNotification();

  useDebounce(
    async () => {
      try {
        if (content && !params.isEdit) {
          const data = JSON.stringify({
            date: dayjs(),
            bookId: params.bookId,
            content,
          });
          await AsyncStorage.setItem(userEditorDraftItem, data);
        }
      } catch (e) {
        console.log("error on saving draft = ", e);
      }
    },
    2000,
    [content]
  );

  useEffect(() => {
    const checkForDrafts = async () => {
      const draft = await AsyncStorage.getItem(userEditorDraftItem);
      if (draft) {
        const draftData = JSON.parse(draft);
        setContent(draftData.content);
      }
    };
    // only check for draft on new pages
    if (!params.isEdit) {
      checkForDrafts();
    }
  }, [params.bookId, params.isEdit]);

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
      }) => (
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
      ),
    }),
    {}
  );

  const onSave = async () => {
    try {
      const newPageId = uuid();
      // create a new page
      if (content && !params.isEdit) {
        const res = await createPage(
          newPageId,
          content,
          params.bookId,
          String(dayjs())
        );
        if (res === "success") {
          await loadActivity(dispatch);
        }
      }

      // Save a existing page
      if (content && params.isEdit && params.page) {
        const res = await updatePageById(params.page.id, content);
        if (res === "success") {
          await loadActivity(dispatch);
        }
      }

      if (content && content !== params.page?.content) {
        const message =
          params.isEdit && params.page
            ? "notifications.editPage.success"
            : "notifications.savePage.success";

        notification(i18n.t(message), NotificationType.success);
      }

      // Remove any saved drafts before going back
      await AsyncStorage.removeItem(userEditorDraftItem);
      setEditorLoading(true);

      setTimeout(() => {
        navigation.navigate("Diary", {
          bookId: params.bookId,
          bookTitle: params.bookTitle,
          activityPageId: !params.isEdit ? newPageId : params.page?.id,
        });
      }, 0);
    } catch (e) {
      const message = params.isEdit
        ? "notifications.editPage.error"
        : "notifications.savePage.error";

      notification(i18n.t(message), NotificationType.danger);
    }
  };

  const getDate =
    params.isEdit && params.page ? params.page.createdAt : dayjs();

  const editorInitialized = () => {
    setTimeout(() => {
      setEditorLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (isKeyboardOpen) {
      Animated.timing(headerAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [headerAnimation, isKeyboardOpen]);

  const animationStyles = {
    opacity: headerAnimation,
    height: headerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 85],
    }),
  };

  return (
    <CustomSafeArea>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles(theme).keyboardAvoidingView}
        keyboardVerticalOffset={30}
      >
        <Container>
          <HeaderKeepSpacer>
            <AnimatedHeader style={animationStyles}>
              <Header
                hasMarginBottom={false}
                hasBackButton
                onPress={onSave}
                text={params.bookTitle}
              />
            </AnimatedHeader>
          </HeaderKeepSpacer>
          <ContentWrapper
            onLayout={(e) => {
              const { height } = e.nativeEvent.layout;
              setEditorHeight(Math.floor(height) - 52);
            }}
          >
            <NoteBook
              hasPaddingBottom={false}
              page={params.pageNumber.toString() || "0"}
              date={dayjs(getDate).format("DD MMM YYYY")}
              day={dayjs(getDate).format("dddd")}
              isLoading={isEditorLoading}
              isSimpleLayout
            >
              <EditorContainer editorHeight={editorHeight}>
                <RichEditor
                  ref={RichTextRef}
                  editorStyle={{
                    backgroundColor: theme.richEditor.backgroundColor,
                    color: theme.richEditor.textColor,
                    placeholderColor: theme.richEditor.placeholderColor,
                    contentCSSText: `font-family: sans-serif; font-size: 14px; padding: 0; line-height: 40px;`,
                  }}
                  placeholder={i18n.t("editorScreen.richEditor.placeholder")}
                  initialFocus={false}
                  disabled={false}
                  useContainer={false}
                  initialContentHTML={unescapeHtml(content)}
                  onChange={(text: string) =>
                    setContent(
                      sanitize(text, { whiteList: { div: ["style"] } })
                    )
                  }
                  editorInitializedCallback={editorInitialized}
                />
              </EditorContainer>
            </NoteBook>
          </ContentWrapper>
          {/* ToolBar */}
          <ToolBarWrapper isKeyboardOpen={isKeyboardOpen}>
            <RichToolbar
              style={styles(theme).richToolBar}
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
          </ToolBarWrapper>
        </Container>
      </KeyboardAvoidingView>
    </CustomSafeArea>
  );
};

export default EditorScreen;
