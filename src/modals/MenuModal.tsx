import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userPasswordPinItem, userThemeItem } from "utils/constants";
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
import { NetworkStatus, SubscriptionStatus } from "types/store";
import { AuthType } from "types/navigation";
// API
import supabase from "libs/supabase";
/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";

const MenuModal: React.FC = () => {
  const store = useStore();
  const { notification } = useNotification();
  const [isPinProtected, setIsPinProtected] = useState(false);

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

  useEffect(() => {
    if (store.state.hasPasswordPin) {
      setIsPinProtected(true);
    }
  }, [store.state.hasPasswordPin]);

  const onChangeTheme = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(userThemeItem, String(value));
      store.dispatch({
        type: "SET_DARK_THEME",
        payload: { isDarkTheme: value },
      });
    } catch (e) {
      notification(
        i18n.t("notifications.changeTheme.error"),
        NotificationType.danger
      );
    }
  };

  const onChangePasswordPin = async (active: boolean) => {
    try {
      if (!active) {
        await AsyncStorage.removeItem(userPasswordPinItem);
        setIsPinProtected(false);
        store.dispatch({
          type: "SET_PASSWORD_PIN",
          payload: { hasPasswordPin: false, passwordPin: null },
        });
      } else {
        navigate("Password");
        setTimeout(() => {
          onClose();
        }, 100);
      }
    } catch (e) {
      notification(
        i18n.t("notifications.removePasswordPin.error"),
        NotificationType.danger
      );
    }
  };

  const onLogout = async () => {
    try {
      await supabase.auth.signOut();
      store.dispatch({
        type: "SET_AUTHENTICATION_STATUS",
        payload: {
          user: null,
          subscriptionStatus: SubscriptionStatus.inactive,
        },
      });
      store.dispatch({
        type: "SET_NETWORK_STATUS",
        payload: {
          status: NetworkStatus.online,
        },
      });
    } catch (e) {
      notification(
        i18n.t("notifications.logout.error"),
        NotificationType.danger
      );
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
        title={i18n.t("modal.menu.theme")}
        onChangeSwitch={onChangeTheme}
        isSwitchActive={store.state.isDarkTheme}
        hasArrowIcon={false}
        hasThemeSwitch
      />
      {!store.state.user && store.state.networkStatus === NetworkStatus.online && (
        <BorderButton
          title={i18n.t("modal.menu.premium")}
          onPress={() => {
            onClose();
            // @ts-ignore
            navigate("Cloud", { type: AuthType.signup });
          }}
        />
      )}
      <BorderButton
        title={i18n.t("modal.menu.pinProtection")}
        hasCustomSwitch
        isSwitchActive={isPinProtected}
        onChangeSwitch={onChangePasswordPin}
        hasArrowIcon={false}
      />
      <BorderButton
        title={i18n.t("terms.section.title")}
        onPress={() => {
          onClose();
          // @ts-ignore
          navigate("Terms");
        }}
      />
      <BorderButton
        title={i18n.t("privacy.section.title")}
        onPress={() => {
          onClose();
          // @ts-ignore
          navigate("Privacy");
        }}
      />
      {store.state.user && (
        <BorderButton title={i18n.t("modal.menu.logout")} onPress={onLogout} />
      )}
      <Brand />
    </Modal>
  );
};

export default MenuModal;
