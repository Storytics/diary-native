import React from "react";
import { Alert } from "react-native";
// Components
import { MaterialIcons } from "@expo/vector-icons";
import RoundButton from "components/RoundButton";
// Styles
import { useTheme } from "styled-components";
// Hooks
import useStore from "hooks/useStore";
import { useNavigation } from "@react-navigation/core";
// Types
import { NetworkStatus, SubscriptionStatus, User } from "types/store";
// Database
import { exportAllData } from "database/Global";
// API
import supabase from "libs/supabase";
// Utils
import { userCloudLastSyncItem } from "utils/constants";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";

const status = {
  loading: "cached",
  online: "cloud-off",
  offline: "wifi-off",
  lock: "no-encryption",
  authenticated: "backup",
  sync: "cloud-done",
};

/*
const onGetBackup = async () => {
  try {
    const { data, error } = await supabase
      .from("backup")
      .select("*")
      // .eq("user_id", "82e3e8cb-ff55-4453-bd1a-9734d2146a03")
      .order("created_at", { ascending: true })
      .limit(1);

    console.log("onGetBackup data = ", data);
    console.log("error = ", error);
  } catch (error) {
    console.log("onGetBackup Error = ", error);
  }
};
 */

const NetworkStatusComponent: React.FC = () => {
  const theme = useTheme();
  const {
    state: { networkStatus, subscriptionStatus, user },
  } = useStore();
  const navigation = useNavigation();

  const onCreateBackup = async () => {
    try {
      if (user) {
        const lastCloudSync = await AsyncStorage.getItem(userCloudLastSyncItem);

        const isSync =
          lastCloudSync &&
          dayjs(lastCloudSync).isAfter(
            dayjs(new Date()).subtract(30, "minutes")
          );

        if (!isSync) {
          const allData = await exportAllData();
          const { data } = await supabase.from("backup").insert([
            {
              data: JSON.stringify(allData),
              user_id: user.id,
            },
          ]);

          await AsyncStorage.setItem(userCloudLastSyncItem, String(new Date()));

          console.log("onCreateBackup data = ", data);
        } else {
          Alert.alert("Everything is up to date");
        }
      }
    } catch (error) {
      console.log("onCreateBackup Error = ", error);
    }
  };

  const renderStatusComponent = () => {
    if (networkStatus === NetworkStatus.online) {
      return (
        <RoundButton size="medium" onPress={() => navigation.navigate("Cloud")}>
          <MaterialIcons
            name={status.online as keyof typeof MaterialIcons.glyphMap}
            size={24}
            color={theme.iconDefaultColor}
          />
        </RoundButton>
      );
    }

    if (
      networkStatus === NetworkStatus.authenticated &&
      subscriptionStatus === SubscriptionStatus.inactive
    ) {
      return (
        <RoundButton
          size="medium"
          onPress={() =>
            navigation.navigate("Billing", {
              user: user as User,
            })
          }
        >
          <MaterialIcons
            name={status.lock as keyof typeof MaterialIcons.glyphMap}
            size={24}
            color={theme.iconDefaultColor}
          />
        </RoundButton>
      );
    }

    if (
      networkStatus === NetworkStatus.authenticated &&
      subscriptionStatus === SubscriptionStatus.active
    ) {
      return (
        <RoundButton size="medium" onPress={onCreateBackup}>
          <MaterialIcons
            name={status.authenticated as keyof typeof MaterialIcons.glyphMap}
            size={24}
            color={theme.iconDefaultColor}
          />
        </RoundButton>
      );
    }

    return (
      <RoundButton size="medium">
        <MaterialIcons
          name={status.offline as keyof typeof MaterialIcons.glyphMap}
          size={24}
          color={theme.iconDefaultColor}
        />
      </RoundButton>
    );
  };

  return networkStatus === NetworkStatus.loading &&
    SubscriptionStatus.loading ? (
    <RoundButton size="medium">
      <MaterialIcons
        name={status.loading as keyof typeof MaterialIcons.glyphMap}
        size={24}
        color={theme.iconDefaultColor}
      />
    </RoundButton>
  ) : (
    renderStatusComponent()
  );
};

export default NetworkStatusComponent;
