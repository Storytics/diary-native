import React from "react";
// Components
import Container from "components/Container";
import Header from "components/Header";
import DiaryCardList from "components/DiaryCardList";
import ActivityCardList from "components/ActivityCardList";
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

const HomeScreen: React.FC<Props> = () => {
  return (
    <SafeAreaView>
      <Container>
        <Header text={i18n.t("diariesSectionTitle")} />
        <DiaryCardList data={listData} />
        <Header text={i18n.t("recentActivitySectionTitle")} />
        <ActivityCardList data={activityData} />
      </Container>
    </SafeAreaView>
  );
};

export default HomeScreen;
