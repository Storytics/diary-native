import React, { useState, createRef, useMemo, useCallback } from "react";
import { useTheme } from "styled-components/native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
// Components
import Container from "components/Container";
import NoteBook from "components/NoteBook";
import CustomSafeArea from "components/CustomSafeArea";
// Utils
import { unescapeHtml } from "utils/functions";
import dayjs from "dayjs";
import i18n from "locales/index";
// Hooks
import useNotification from "hooks/useNotification";
// Types
import { DiaryNavigationProps } from "types/navigation";
import { PageProps } from "types/page";
import Header from "components/Header";
import Navigation from "components/Navigation";
import { RichEditor } from "react-native-pell-rich-editor";
import { NotificationType } from "types/notifications";
// Database
import { getAllPagesByBookId } from "database/Page";
import {
  NoteBookContainer,
  NavigationContainer,
  EditorContainer,
} from "./styles";

const defaultPage = {
  id: 0,
  content: "",
  createdAt: String(dayjs()),
  bookId: 0,
};

const DiaryScreen: React.FC<DiaryNavigationProps> = ({
  navigation,
  route: { params },
}) => {
  const RichTextViewRef = createRef<RichEditor>();
  const [bookPages, setBookPages] = useState<Array<PageProps>>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [noteBookHeight, setNoteBookHeight] = useState(0);
  const theme = useTheme();
  const isFocused = useIsFocused();
  const notification = useNotification();

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
          const pages = await getAllPagesByBookId(params.bookId);
          // This gets the page from the index and focus on the page
          // this is for activities and when the user edits or creates a page
          const activityIndex = pages.findIndex(
            (page: PageProps) => page.id === params.activityPageId
          );

          setBookPages([...pages, defaultPage]);
          setPageNumber(activityIndex === -1 ? pages.length : activityIndex);
        } catch (e) {
          notification.dispatch({
            type: "CREATE_NOTIFICATION",
            payload: {
              isOpen: true,
              message: i18n.t("notifications.loadPages.error"),
              type: NotificationType.danger,
            },
          });
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
      setPageNumber(prevPage);
    }
  };

  const onNextPage = () => {
    const nextPage = pageNumber + 1;
    const isValidPage = bookPages[nextPage];

    if (isValidPage) {
      setPageNumber(nextPage);
    }
  };

  const onHandleAction = () => {
    const page = !isCreatePage ? currentPage : defaultPage;

    const pageIndex = bookPages.findIndex(
      (item: PageProps) => item.id === page.id
    );

    navigation.navigate("Editor", {
      noteBookHeight,
      bookId: params.bookId,
      isEdit: !isCreatePage,
      bookTitle: params.bookTitle,
      pageNumber: isCreatePage ? bookPages.length : pageIndex + 1,
      page,
    });
  };

  return (
    <CustomSafeArea>
      <Container>
        <Header
          hasBackButton
          onPress={() => {
            navigation.navigate("Home");
          }}
          text={params.bookTitle}
        />
        <NoteBookContainer
          onLayout={(e) => {
            const { height } = e.nativeEvent.layout;
            if (noteBookHeight <= 0) {
              setNoteBookHeight(height);
            }
          }}
        >
          <NoteBook
            key={`page-${currentPage.id.toString()}-${
              isFocused ? "focus" : "blur"
            }`}
            date={dayjs(currentPage.createdAt).format("DD MMM YYYY")}
            day={dayjs(currentPage.createdAt).format("dddd")}
            page={`${pageNumber + 1} / ${bookPages.length}`}
            hasPaddingBottom={false}
          >
            <EditorContainer>
              <RichEditor
                ref={RichTextViewRef}
                editorStyle={{
                  backgroundColor: theme.richEditor.backgroundColor,
                  color: theme.richEditor.textColor,
                  placeholderColor: theme.richEditor.placeholderColor,
                  contentCSSText: `font-family: sans-serif; font-size: 14px; padding: 0; line-height: 40px;`,
                }}
                placeholder="Start Writing Here"
                disabled
                initialContentHTML={unescapeHtml(currentPage.content)}
                useContainer={false}
              />
            </EditorContainer>
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
