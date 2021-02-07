import React from "react";
// Components
import { SafeAreaView } from "react-native-safe-area-context";
import Container from "components/Container";
import NoteBook from "components/NoteBook";
// Types
import { DiaryScreenNavigationProp } from "navigation/types";
import Header from "components/Header";
import Navigation from "components/Navigation";

interface Props {
  navigation: DiaryScreenNavigationProp;
}

const DiaryScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Container>
        <Header
          hasBackButton
          onPress={() => {
            navigation.navigate("Home");
          }}
          text="Story's"
        />
        <NoteBook date="23 Jan 2021" day="Friday" page="1" />
        <Navigation
          isPageNavigation
          onPressLeft={() => {
            navigation.navigate("Home");
          }}
          onPressMain={() => {
            navigation.navigate("Home");
          }}
          onPressRight={() => {
            navigation.navigate("Home");
          }}
        />
      </Container>
    </SafeAreaView>
  );
};

export default DiaryScreen;
