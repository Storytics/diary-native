import React from "react";
// Components
import Container from "components/Container";
import Header from "components/Header";
import DiaryCardList from "components/DiaryCardList";
import ActivityCardList from "components/ActivityCardList";
import Navigation from "components/Navigation";
// Utils
import { SafeAreaView } from "react-native-safe-area-context";
// Types
import { HomeScreenNavigationProp } from "navigation/types";
// Locales
import i18n from "locales/index";
// Mock data
import { listData, activityData } from "./mockData";

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Container>
        <Header text={i18n.t("diaries.section.title")} />
        <DiaryCardList
          data={listData}
          onPress={() => {
            navigation.navigate("Diary");
          }}
          onPressMore={() => {
            navigation.navigate("Diary");
          }}
          placeholderText={i18n.t("diaries.section.placeholderText")}
        />
        <Header text={i18n.t("activity.section.title")} />
        <ActivityCardList
          data={activityData}
          onPress={() => {
            navigation.navigate("Diary");
          }}
          placeholderText={i18n.t("activity.section.placeholderText")}
        />
        <Navigation
          onPressUpload={() => {
            navigation.navigate("Diary");
          }}
          onPressCreate={() => {
            navigation.navigate("Diary");
          }}
          onPressMenu={() => {
            navigation.navigate("Diary");
          }}
        />
      </Container>
    </SafeAreaView>
  );
};

export default HomeScreen;
