import React from "react";
// Components
import Container from "components/Container";
import Header from "components/Header";
import DiaryCardList from "components/DiaryCardList";
import ActivityCardList from "components/ActivityCardList";
import Navigation from "components/Navigation";
import CustomSafeArea from "components/CustomSafeArea";
// Hooks
import useModals from "hooks/useModals";
import useStore from "hooks/useStore";
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
  const modalsContext = useModals();
  const {
    state: { books, activity },
  } = useStore();

  return (
    <CustomSafeArea>
      <Container>
        <Header text={i18n.t("diaries.section.title")} />
        <DiaryCardList
          data={books}
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
          data={activity}
          onPress={() => {
            navigation.navigate("Diary");
          }}
          placeholderText={i18n.t("activity.section.placeholderText")}
        />
        <Navigation
          onPressLeft={() => {
            navigation.navigate("Diary");
          }}
          onPressMain={() => {
            modalsContext.dispatch({
              type: "CREATE_DIARY_MODAL",
              payload: { isOpen: true },
            });
          }}
          onPressRight={() => {
            modalsContext.dispatch({
              type: "MENU_MODAL",
              payload: { isOpen: true },
            });
          }}
        />
      </Container>
    </CustomSafeArea>
  );
};

export default HomeScreen;
