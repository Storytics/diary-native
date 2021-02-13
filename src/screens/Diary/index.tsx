import React from "react";
// Components
import Container from "components/Container";
import NoteBook from "components/NoteBook";
import CustomSafeArea from "components/CustomSafeArea";
// Types
import { DiaryScreenNavigationProp } from "navigation/types";
import Header from "components/Header";
import Navigation from "components/Navigation";

interface Props {
  navigation: DiaryScreenNavigationProp;
}

const DiaryScreen: React.FC<Props> = ({ navigation }) => {
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
        <NoteBook date="23 Jan 2021" day="Friday" page={1} />
        <Navigation
          isPageNavigation
          onPressLeft={() => {
            navigation.navigate("Home");
          }}
          onPressMain={() => {
            navigation.navigate("Editor");
          }}
          onPressRight={() => {
            navigation.navigate("Home");
          }}
        />
      </Container>
    </CustomSafeArea>
  );
};

export default DiaryScreen;
