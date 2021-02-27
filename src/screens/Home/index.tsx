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
import { HomeNavigationProps } from "types/navigation";
// Locales
import i18n from "locales/index";

const HomeScreen: React.FC<HomeNavigationProps> = ({ navigation }) => {
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
          onPress={(bookId: number, bookTitle: string) => {
            navigation.navigate("Diary", {
              bookId,
              bookTitle,
            });
          }}
          onPressMore={() => {
            modalsContext.dispatch({
              type: "DIARY_ACTIONS_MODAL",
              payload: { isOpen: true },
            });
          }}
          placeholderText={i18n.t("diaries.section.placeholderText")}
        />
        <Header text={i18n.t("activity.section.title")} />
        <ActivityCardList
          data={activity}
          onPress={(
            bookId: number,
            bookTitle: string,
            activityPageId: number
          ) => {
            navigation.navigate("Diary", {
              bookId,
              bookTitle,
              activityPageId,
            });
          }}
          placeholderText={i18n.t("activity.section.placeholderText")}
        />
        <Navigation
          onPressLeft={() => console.log("sync to the cloud")}
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
