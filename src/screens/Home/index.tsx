import React, { useState } from "react";
// Components
import Container from "components/Container";
import Header from "components/Header";
import DiaryCardList from "components/DiaryCardList";
import ActivityCardList from "components/ActivityCardList";
import Navigation from "components/Navigation";
import Modal from "components/Modal";
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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
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
          onPressLeft={() => {
            navigation.navigate("Diary");
          }}
          onPressMain={() => {
            setIsCreateModalOpen(true);
          }}
          onPressRight={() => {
            setIsMenuModalOpen(true);
          }}
        />
        {/* Create New Diary Modal */}
        <Modal
          title={i18n.t("modal.create.title")}
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onPressPrimary={() => console.log("Save")}
          onPressSecondary={() => console.log("Cancel")}
          primaryButtonText={i18n.t("modal.create.buttons.primary")}
          secondaryButtonText={i18n.t("modal.create.buttons.secondary")}
        />
        {/* Menu Modal */}
        <Modal
          title={i18n.t("modal.menu.title")}
          isOpen={isMenuModalOpen}
          onClose={() => setIsMenuModalOpen(false)}
          onPressPrimary={() => console.log("Save")}
          onPressSecondary={() => console.log("Cancel")}
          hasActionButtons={false}
        />
      </Container>
    </SafeAreaView>
  );
};

export default HomeScreen;
