import React, { useCallback, useEffect, useState } from "react";
import { Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { showFullscreenAd } from "components/AdBanner";
// Types
import { NotificationType } from "types/notifications";
import { NetworkStatus, SubscriptionStatus } from "types/store";
import { AuthType } from "types/navigation";
// Utils
import {
  userPasswordPinItem,
  userThemeItem,
  isLiteVersion,
  diaryProStoreUrl,
} from "utils/constants";
// Context
import { setNetworkStatus } from "context/StoreContext";
// API
import supabase from "libs/supabase";

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
      if (isLiteVersion && store.state.networkStatus === NetworkStatus.online) {
        await showFullscreenAd();
      }

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
      setNetworkStatus(store.dispatch, NetworkStatus.online);
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

      {isLiteVersion && store.state.networkStatus === NetworkStatus.online && (
        <BorderButton
          title={i18n.t("modal.menu.removeAds")}
          onPress={async () => {
            onClose();
            await Linking.openURL(diaryProStoreUrl);
          }}
        />
      )}

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

      {store.state.user &&
        store.state.subscriptionStatus === SubscriptionStatus.active && (
          <BorderButton
            title={i18n.t("modal.menu.portal")}
            onPress={() => {
              onClose();
              // @ts-ignore
              navigate("Portal", { user: store.state.user });
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
