import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, AppState, AppStateStatus, StatusBar, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Updates from "expo-updates";
// Components
import Notification from "components/Notification";
import { getLastCloudSync, uploadDataToCloud } from "components/NetworkStatus";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
// Styles
import { ThemeProvider } from "styled-components/native";
import themeLight from "theme/index";
import themeDark from "theme/dark";
// Navigation
import Navigation, { navigate } from "navigation/index";
// Contexts
import { ModalsContextProvider } from "context/ModalsContext";
import { setNetworkStatus, StoreContextProvider } from "context/StoreContext";
import { NotificationsContextProvider } from "context/NotificationContext";
// Modals
import Modals from "modals/index";
// Hooks
import useStore from "hooks/useStore";
import useInterval from "hooks/useInterval";
// Types
import { NetworkStatus, SubscriptionStatus } from "types/store";
// Utils
import Constants from "expo-constants";
// Locales
import i18n from "locales/index";

/** URL polyfill. Required for Supabase queries to work in React Native. */
import "react-native-url-polyfill/auto";
import supabase from "libs/supabase";

interface Props {
  isFontsLoading: boolean;
  isDatabaseLoading: boolean;
}

// 15 Minutes
const backupPollerTime = 900000;

const Register: React.FC<Props> = ({ isFontsLoading, isDatabaseLoading }) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const {
    state: {
      user,
      isDarkTheme,
      isHomeScreenLoading,
      hasPasswordPin,
      isLocalAuthentication,
      subscriptionStatus,
      networkStatus,
    },
    dispatch,
  } = useStore();

  const hasBackupPoller = useMemo(
    () =>
      appStateVisible === "active" &&
      subscriptionStatus === SubscriptionStatus.active &&
      networkStatus === NetworkStatus.authenticated &&
      user,
    [appStateVisible, subscriptionStatus, networkStatus, user]
  );

  useInterval(
    async () => {
      try {
        if (!isHomeScreenLoading && hasBackupPoller) {
          const session = supabase.auth.session();
          if (session && user) {
            const isSync = await getLastCloudSync();
            if (!isSync) {
              await uploadDataToCloud(dispatch, user);
            }
          } else {
            setNetworkStatus(dispatch, NetworkStatus.online);
          }
        }
      } catch (e) {
        console.log("Error uploading backup from poller = ", e);
      }
    },
    hasBackupPoller ? backupPollerTime : null
  );

  const theme = isDarkTheme ? themeDark : themeLight;

  useEffect(() => {
    if (
      !isHomeScreenLoading &&
      hasPasswordPin &&
      !isLocalAuthentication &&
      appStateVisible === "active"
    ) {
      navigate("Password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHomeScreenLoading, hasPasswordPin, appStateVisible]);

  useEffect(() => {
    // Over the air updates
    const checkForOTA = async () => {
      try {
        const { isAvailable } = await Updates.checkForUpdateAsync();

        if (isAvailable) {
          const { isNew } = await Updates.fetchUpdateAsync();
          if (isNew) {
            Alert.alert(
              `${i18n.t("alerts.ota.title")} (v${Constants.manifest.version})`,
              i18n.t("alerts.ota.message"),
              [
                {
                  text: i18n.t("alerts.ota.buttons.ok"),
                  onPress: async () => {
                    await Updates.reloadAsync();
                  },
                },
              ],
              { cancelable: false }
            );
          }
        }
      } catch (e) {
        console.log("Error getting the OTA = ", e);
      }
    };

    if (!isHomeScreenLoading) {
      checkForOTA();
    }
  }, [isHomeScreenLoading]);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  if ((isFontsLoading && isDatabaseLoading) || isHomeScreenLoading) {
    return <AppLoading autoHideSplash />;
  }

  return (
    <ThemeProvider theme={theme}>
      <ModalsContextProvider>
        <NotificationsContextProvider>
          <StatusBar
            backgroundColor={theme.container.backgroundColor}
            barStyle={isDarkTheme ? "light-content" : "dark-content"}
          />
          <View
            style={{
              flexGrow: 1,
              backgroundColor: theme.container.backgroundColor,
            }}
          >
            <Navigation />
          </View>
          <Modals />
          <Notification />
        </NotificationsContextProvider>
      </ModalsContextProvider>
    </ThemeProvider>
  );
};
const App: React.FC<Props> = (props) => (
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <StoreContextProvider>
      <Register {...props} />
    </StoreContextProvider>
  </SafeAreaProvider>
);

export default App;
