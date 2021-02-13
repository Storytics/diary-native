import React, { useState } from "react";
// Components
import Container from "components/Container";
import NoteBook from "components/NoteBook";
import CustomSafeArea from "components/CustomSafeArea";
// Types
import { DiaryScreenNavigationProp } from "navigation/types";
import Header from "components/Header";
import Navigation from "components/Navigation";
import { NoteBookContainer, NavigationContainer } from "./styles";

interface Props {
  navigation: DiaryScreenNavigationProp;
}

const DiaryScreen: React.FC<Props> = ({ navigation }) => {
  const [noteBookHeight, setNoteBookHeight] = useState(0);

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
          />
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
