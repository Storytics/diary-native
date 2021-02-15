import React, { useState, createRef, useMemo, useCallback } from "react";
import { useTheme } from "styled-components/native";
import { useFocusEffect } from "@react-navigation/native";
// Components
import Container from "components/Container";
import NoteBook from "components/NoteBook";
import CustomSafeArea from "components/CustomSafeArea";
// Utils
import { unescapeHtml } from "utils/functions";
import dayjs from "dayjs";
// Types
import { DiaryNavigationProps } from "types/navigation";
import { PageProps } from "types/page";
import Header from "components/Header";
import Navigation from "components/Navigation";
import { RichEditor } from "react-native-pell-rich-editor";
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

const DiaryScreen: React.FC<DiaryNavigationProps> = ({ navigation, route }) => {
  const RichTextViewRef = createRef<RichEditor>();
  const [bookPages, setBookPages] = useState<Array<PageProps>>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [noteBookHeight, setNoteBookHeight] = useState(0);
  const theme = useTheme();

  const currentPage = useMemo(
    () => (bookPages.length > 0 ? bookPages[pageNumber] : defaultPage),
    [bookPages, pageNumber]
  );

  useFocusEffect(
    useCallback(() => {
      const onLoadPages = async () => {
        try {
          const pages = await getAllPagesByBookId(route.params.bookId);
          setBookPages([...pages, defaultPage]);
          setPageNumber(pages.length);
        } catch (e) {
          console.log("error loading pages for this book ", e);
        }
      };

      onLoadPages();
    }, [route.params.bookId])
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

  return (
    <CustomSafeArea>
      <Container>
        <Header
          hasBackButton
          onPress={() => {
            navigation.navigate("Home");
          }}
          text={route.params.bookTitle}
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
            key={currentPage.id}
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
            pageNavigationIcon={
              pageNumber + 1 === bookPages.length ? "add" : "create"
            }
            onPressLeft={onPrevPage}
            onPressMain={() => {
              navigation.navigate("Editor", {
                noteBookHeight,
                bookId: route.params.bookId,
              });
            }}
            onPressRight={onNextPage}
          />
        </NavigationContainer>
      </Container>
    </CustomSafeArea>
  );
};

export default DiaryScreen;
