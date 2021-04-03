import React, { useState, createRef, useMemo, useCallback } from "react";
import { useTheme } from "styled-components/native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Components
import Container from "components/Container";
import NoteBook from "components/NoteBook";
import CustomSafeArea from "components/CustomSafeArea";
// Utils
import { cleanUpContent, unescapeHtml } from "utils/functions";
import dayjs from "dayjs";
import { userEditorDraftItem } from "utils/constants";
// Hooks
import useNotification from "hooks/useNotification";
import useStore from "hooks/useStore";
// Types
import { DiaryNavigationProps } from "types/navigation";
import { PageProps } from "types/page";
import Header from "components/Header";
import Navigation from "components/Navigation";
import { RichEditor } from "react-native-pell-rich-editor";
import { NotificationType } from "types/notifications";
// Database
import { getAllPagesByBookId } from "database/Page";
// Locales
import i18n from "locales/index";
// Styled components
import { NoteBookContainer, NavigationContainer } from "./styles";

const defaultPage = {
  id: "0",
  content: "",
  createdAt: String(dayjs()),
  bookId: "",
};

const DiaryScreen: React.FC<DiaryNavigationProps> = ({
  navigation,
  route: { params },
}) => {
  const RichTextViewRef = createRef<RichEditor>();
  const [bookPages, setBookPages] = useState<Array<PageProps>>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isEditorLoading, setEditorLoading] = useState(true);
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { notification } = useNotification();
  const {
    state: { isDarkTheme },
  } = useStore();

  const isCreatePage = useMemo(() => pageNumber + 1 === bookPages.length, [
    pageNumber,
    bookPages,
  ]);

  const currentPage = useMemo(
    () => (bookPages.length > 0 ? bookPages[pageNumber] : defaultPage),
    [bookPages, pageNumber]
  );

  useFocusEffect(
    useCallback(() => {
      const onLoadPages = async () => {
        try {
          setEditorLoading(true);
          const pages = await getAllPagesByBookId(params.bookId);
          // This gets the page from the index and focus on the page
          // this is for activities and when the user edits or creates a page
          const activityIndex = pages.findIndex(
            (page: PageProps) => page.id === params.activityPageId
          );

          setBookPages([...pages, defaultPage]);
          setPageNumber(activityIndex === -1 ? pages.length : activityIndex);

          if (activityIndex !== -1) {
            console.log("entrou aqui");
            // Remove any saved drafts before going back
            await AsyncStorage.removeItem(userEditorDraftItem);
          }
        } catch (e) {
          notification(
            i18n.t("notifications.loadPages.error"),
            NotificationType.danger
          );
        }
      };

      onLoadPages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.bookId, params.activityPageId])
  );

  const onPrevPage = () => {
    const prevPage = pageNumber - 1;
    const isValidPage = bookPages[prevPage];

    if (isValidPage) {
      setEditorLoading(true);
      setPageNumber(prevPage);
    }
  };

  const onNextPage = () => {
    const nextPage = pageNumber + 1;
    const isValidPage = bookPages[nextPage];

    if (isValidPage) {
      setEditorLoading(true);
      setPageNumber(nextPage);
    }
  };

  const onHandleAction = () => {
    const page = !isCreatePage ? currentPage : defaultPage;

    const pageIndex = bookPages.findIndex(
      (item: PageProps) => item.id === page.id
    );

    setEditorLoading(isDarkTheme);

    setTimeout(() => {
      navigation.navigate("Editor", {
        bookId: params.bookId,
        isEdit: !isCreatePage,
        bookTitle: params.bookTitle,
        pageNumber: isCreatePage ? bookPages.length : pageIndex + 1,
        page,
      });
    }, 0);
  };

  const editorInitialized = () => {
    setTimeout(() => {
      setEditorLoading(false);
    }, 500);
  };

  return (
    <CustomSafeArea>
      <Container>
        <Header
          hasBackButton
          onPress={() => {
            setEditorLoading(isDarkTheme);
            setTimeout(() => {
              navigation.navigate("Home");
            }, 0);
          }}
          text={params.bookTitle}
        />
        <NoteBookContainer>
          <NoteBook
            key={`page-${cleanUpContent(
              currentPage.content.substring(0, 45).replace(/ /g, "-").trim()
            )}-${isFocused ? "focus" : "blur"}`}
            date={dayjs(currentPage.createdAt).format("DD MMM YYYY")}
            day={dayjs(currentPage.createdAt).format("dddd")}
            page={`${pageNumber + 1} / ${bookPages.length}`}
            hasPaddingBottom={false}
            isLoading={isEditorLoading}
          >
            <RichEditor
              ref={RichTextViewRef}
              editorStyle={{
                backgroundColor: theme.richEditor.backgroundColor,
                color: theme.richEditor.textColor,
                placeholderColor: theme.richEditor.placeholderColor,
                contentCSSText: `font-family: sans-serif; font-size: 14px; padding: 0; line-height: 40px; display: flex; flex-direction: column;`,
              }}
              placeholder={i18n.t("diaryScreen.richEditor.placeholder")}
              disabled
              initialContentHTML={unescapeHtml(currentPage.content)}
              useContainer
              editorInitializedCallback={editorInitialized}
            />
          </NoteBook>
        </NoteBookContainer>
        <NavigationContainer>
          <Navigation
            isPageNavigation
            pageNavigationIcon={isCreatePage ? "add" : "create"}
            onPressLeft={onPrevPage}
            onPressMain={onHandleAction}
            onPressRight={onNextPage}
          />
        </NavigationContainer>
      </Container>
    </CustomSafeArea>
  );
};

export default DiaryScreen;
