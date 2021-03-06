import React, { useEffect } from "react";
// Context
import { loadActivity, loadBooks } from "context/StoreContext";
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
// Database
import { importDataToDatabase } from "database/Global";
// API
import supabase from "libs/supabase";

const HomeScreen: React.FC<HomeNavigationProps> = ({ navigation }) => {
  const modalsContext = useModals();
  const {
    state: { books, activity, checkForBackups, user },
    dispatch,
  } = useStore();

  useEffect(() => {
    if (checkForBackups) {
      const onGetBackup = async () => {
        try {
          if (user) {
            const { data } = await supabase
              .from("backup")
              .select("*")
              .eq("user_id", user.id)
              .order("created_at", { ascending: true })
              .limit(1);

            if (data && data?.length > 0) {
              await importDataToDatabase(JSON.parse(data[0].data));
              await loadBooks(dispatch);
              await loadActivity(dispatch);
              dispatch({
                type: "SET_CHECK_FOR_BACKUPS",
                payload: { check: false },
              });
            }
          }
        } catch (error) {
          console.log("onGetBackup Error = ", error);
        }
      };
      onGetBackup();
    }
  }, [checkForBackups, dispatch, user]);

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
          onPressMore={(
            bookId: number,
            bookTitle: string,
            bookColor: string
          ) => {
            modalsContext.dispatch({
              type: "DIARY_ACTIONS_MODAL",
              payload: { isOpen: true, bookId, bookTitle, bookColor },
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
