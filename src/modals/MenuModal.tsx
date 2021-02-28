import React, { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userThemeItem } from "utils/constants";
import i18n from "locales/index";
import { navigate } from "navigation/index";
// Hooks
import useModals from "hooks/useModals";
import useStore from "hooks/useStore";
import useNotification from "hooks/useNotification";
// Components
import BorderButton from "components/BorderButton";
import Brand from "components/Brand";
import Modal from "components/Modal";
// Types
import { NotificationType } from "types/notifications";

const MenuModal: React.FC = () => {
  const store = useStore();
  const notification = useNotification();

  const {
    dispatch,
    state: { isMenuModalOpen },
  } = useModals();

  const onClose = useCallback(() => {
    dispatch({
      type: "MENU_MODAL",
      payload: { isOpen: false },
    });
  }, [dispatch]);

  const onChangeTheme = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(userThemeItem, String(value));
      store.dispatch({
        type: "SET_DARK_THEME",
        payload: { isDarkTheme: value },
      });
    } catch (e) {
      notification.dispatch({
        type: "CREATE_NOTIFICATION",
        payload: {
          isOpen: true,
          message: i18n.t("notifications.changeTheme.error"),
          type: NotificationType.danger,
        },
      });
    }
  };

  if (!isMenuModalOpen) {
    return null;
  }

  return (
    <Modal
      title={i18n.t("modal.menu.title")}
      isOpen={isMenuModalOpen}
      onClose={onClose}
      onPressPrimary={() => console.log("Save")}
      onPressSecondary={() => console.log("Cancel")}
      hasActionButtons={false}
      hasContentPaddingTop={false}
      hasContentPaddingBottom={false}
    >
      <BorderButton
        title="Theme"
        onChangeSwitch={onChangeTheme}
        isSwitchActive={store.state.isDarkTheme}
        hasArrowIcon={false}
        hasThemeSwitch
      />
      <BorderButton title="Upload Data" onPress={() => console.log("data")} />
      <BorderButton
        title="Password Protection"
        onPress={() => {
          navigate("Password");
          setTimeout(() => {
            onClose();
          }, 100);
        }}
      />
      <BorderButton
        title="Terms and Conditions"
        onPress={() => console.log("terms")}
      />
      <Brand />
    </Modal>
  );
};

export default MenuModal;
