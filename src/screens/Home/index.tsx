import React, { useState } from "react";
// Components
import Container from "components/Container";
import Header from "components/Header";
import DiaryCardList from "components/DiaryCardList";
import ActivityCardList from "components/ActivityCardList";
import Navigation from "components/Navigation";
import Modal from "components/Modal";
import Input from "components/Input";
import Select from "components/Select";
import BorderButton from "components/BorderButton";
import Brand from "components/Brand";
import CustomSafeArea from "components/CustomSafeArea";
import ToolBar from "components/ToolBar";
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
    <CustomSafeArea>
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
        <ToolBar
          onPressAlignLeft={() => console.log("align left")}
          onChange={(value: string) => console.log("value = ", value)}
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
        >
          <Input title="Title" hasMarginBottom />
          <Select
            title="Identifier"
            onChange={(value: string) => console.log("cor = ", value)}
          />
        </Modal>
        {/* Menu Modal */}
        <Modal
          title={i18n.t("modal.menu.title")}
          isOpen={isMenuModalOpen}
          onClose={() => setIsMenuModalOpen(false)}
          onPressPrimary={() => console.log("Save")}
          onPressSecondary={() => console.log("Cancel")}
          hasActionButtons={false}
          hasContentPaddingTop={false}
          hasContentPaddingBottom={false}
        >
          <BorderButton
            title="Theme"
            onPress={() => console.log("dark")}
            hasArrowIcon={false}
            hasThemeSwitch
          />
          <BorderButton
            title="Upload Data"
            onPress={() => console.log("data")}
          />
          <BorderButton
            title="Password Protection"
            onPress={() => console.log("dark")}
            hasArrowIcon={false}
            hasCustomSwitch
          />
          <BorderButton
            title="Terms and Conditions"
            onPress={() => console.log("terms")}
          />
          <Brand />
        </Modal>
      </Container>
    </CustomSafeArea>
  );
};

export default HomeScreen;
