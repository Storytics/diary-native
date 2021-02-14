import React, { useState, createRef } from "react";
import { useTheme } from "styled-components/native";
// Components
import Container from "components/Container";
import NoteBook from "components/NoteBook";
import CustomSafeArea from "components/CustomSafeArea";
// Utils
import { unescapeHtml } from "utils/functions";
// Types
import { DiaryScreenNavigationProp } from "navigation/types";
import Header from "components/Header";
import Navigation from "components/Navigation";
import { RichEditor } from "react-native-pell-rich-editor";
import {
  NoteBookContainer,
  NavigationContainer,
  EditorContainer,
} from "./styles";

interface Props {
  navigation: DiaryScreenNavigationProp;
}

const DiaryScreen: React.FC<Props> = ({ navigation }) => {
  const RichTextViewRef = createRef<RichEditor>();
  const [noteBookHeight, setNoteBookHeight] = useState(0);
  const theme = useTheme();

  return (
    <CustomSafeArea>
      <Container>
        <Header
          hasBackButton
          onPress={() => {
            navigation.navigate("Home");
          }}
          text="Story's"
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
            date="23 Jan 2021"
            day="Friday"
            page={1}
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
                initialContentHTML={unescapeHtml(
                  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
                )}
                useContainer={false}
              />
            </EditorContainer>
          </NoteBook>
        </NoteBookContainer>
        <NavigationContainer>
          <Navigation
            isPageNavigation
            onPressLeft={() => {
              navigation.navigate("Home");
            }}
            onPressMain={() => {
              navigation.navigate("Editor", {
                noteBookHeight,
              });
            }}
            onPressRight={() => {
              navigation.navigate("Home");
            }}
          />
        </NavigationContainer>
      </Container>
    </CustomSafeArea>
  );
};

export default DiaryScreen;
