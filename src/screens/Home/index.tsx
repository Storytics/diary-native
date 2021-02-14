import React, { useState } from "react";
import { Button } from "react-native";
// Components
import Container from "components/Container";
import Header from "components/Header";
import DiaryCardList from "components/DiaryCardList";
import ActivityCardList from "components/ActivityCardList";
import Navigation from "components/Navigation";
import CustomSafeArea from "components/CustomSafeArea";
// Hooks
import useModals from "hooks/useModals";
// Types
import { HomeScreenNavigationProp } from "navigation/types";
// Locales
import i18n from "locales/index";
// Mock data
import { listData, activityData } from "./mockData";
// Database
import { getAllBooks } from "database/Book";

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const modalsContext = useModals();
  const [diaries, setDiaries] = useState([]);

  const onLoadDiaries = async () => {
    try {
      const result = await getAllBooks();
      setDiaries(result);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CustomSafeArea>
      <Container>
        <Button title="load diaries" onPress={onLoadDiaries} />
        <Header text={i18n.t("diaries.section.title")} />
        <DiaryCardList
          data={diaries}
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
