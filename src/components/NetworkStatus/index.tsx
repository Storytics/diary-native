import React from "react";
// Components
import { MaterialIcons } from "@expo/vector-icons";
import RoundButton from "components/RoundButton";
import { ActivityIndicator } from "react-native";
// Styles
import { useTheme } from "styled-components";
// Hooks
import useStore from "hooks/useStore";
import { useNavigation } from "@react-navigation/core";
import useNotification from "hooks/useNotification";
// Types
import {
  NetworkStatus,
  StoreActions,
  SubscriptionStatus,
  User,
} from "types/store";
import { NotificationType } from "types/notifications";
import { AuthType } from "types/navigation";
// Locales
import i18n from "locales/index";
// Database
import { exportAllData } from "database/Global";
// Context
import { setNetworkStatus } from "context/StoreContext";
// API
import supabase from "libs/supabase";
// Utils
import { userCloudLastSyncItem } from "utils/constants";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const status = {
  loading: "cached",
  online: "cloud-off",
  offline: "wifi-off",
  lock: "no-encryption",
  authenticated: "backup",
  sync: "cloud-done",
};

interface RenderButtonProps {
  name: string;
  onPress?: () => void;
}

export const getLastCloudSync = async () => {
  const lastCloudSync = await AsyncStorage.getItem(userCloudLastSyncItem);

  return (
    lastCloudSync &&
    dayjs(lastCloudSync).isAfter(dayjs(new Date()).subtract(15, "minutes"))
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const uploadDataToCloud = async (
  dispatch: React.Dispatch<StoreActions>,
  user: User
) => {
  setNetworkStatus(dispatch, NetworkStatus.loading);

  const allData = await exportAllData();
  await supabase.from("backup").insert([
    {
      data: JSON.stringify(allData),
      user_id: user.id,
    },
  ]);

  await AsyncStorage.setItem(userCloudLastSyncItem, String(new Date()));
  setNetworkStatus(dispatch, NetworkStatus.authenticated);
};

const NetworkStatusComponent: React.FC = () => {
  const theme = useTheme();
  const {
    state: { networkStatus, subscriptionStatus, user },
    dispatch,
  } = useStore();
  const navigation = useNavigation();
  const { notification } = useNotification();

  const onCreateBackup = async () => {
    try {
      const session = supabase.auth.session();
      if (user && session) {
        const isSync = await getLastCloudSync();

        if (!isSync) {
          await uploadDataToCloud(dispatch, user);
          notification(i18n.t("cloud.sync.success"), NotificationType.success);
        } else {
          notification(
            i18n.t("cloud.sync.updateToDate"),
            NotificationType.success
          );
        }
      } else {
        notification(i18n.t("cloud.sync.expired"), NotificationType.info);
        navigation.navigate("Cloud", { type: AuthType.signin });
      }
    } catch (error) {
      notification(i18n.t("cloud.sync.error"), NotificationType.danger);
    }
  };

  const renderButton = ({ name, ...props }: RenderButtonProps) => (
    <RoundButton size="large" {...props}>
      {name === status.loading ? (
        <ActivityIndicator size="small" color={theme.colors.primary} />
      ) : (
        <MaterialIcons
          name={name as keyof typeof MaterialIcons.glyphMap}
          size={24}
          color={theme.iconDefaultColor}
        />
      )}
    </RoundButton>
  );

  const renderSubscriptionStatus = () => {
    const hasSubscription = subscriptionStatus === SubscriptionStatus.active;
    const props = hasSubscription
      ? {
          onPress: onCreateBackup,
        }
      : {
          onPress: () =>
            navigation.navigate("Billing", {
              user: user as User,
            }),
        };
    return renderButton({
      name: hasSubscription ? status.authenticated : status.lock,
      ...props,
    });
  };

  const renderComponent = () => {
    switch (networkStatus) {
      case NetworkStatus.online:
        return renderButton({
          name: status.online,
          onPress: () =>
            navigation.navigate("Cloud", { type: AuthType.signup }),
        });
      case NetworkStatus.lock:
        return renderButton({
          name: status.lock,
          onPress: () =>
            navigation.navigate("Billing", {
              user: user as User,
            }),
        });
      case NetworkStatus.authenticated:
        return renderSubscriptionStatus();
      case NetworkStatus.offline:
        return renderButton({ name: status.offline });
      case NetworkStatus.sync:
        return renderButton({ name: status.sync });
      case NetworkStatus.loading:
        return renderButton({ name: status.loading });
      default:
        return renderButton({ name: status.offline });
    }
  };

  return <>{renderComponent()}</>;
};

export default NetworkStatusComponent;
