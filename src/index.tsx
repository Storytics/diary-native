import React, { useEffect, useRef, useState } from "react";
import { Alert, AppState, AppStateStatus, StatusBar, View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Updates from "expo-updates";
// Components
import Notification from "components/Notification";
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
import { StoreContextProvider } from "context/StoreContext";
import { NotificationsContextProvider } from "context/NotificationContext";
// Modals
import Modals from "modals/index";
// Hooks
import useStore from "hooks/useStore";
// Utils
import { isDev, userStoreReviewTimeItem } from "utils/constants";
import * as StoreReview from "expo-store-review";
import Constants from "expo-constants";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Locales
import i18n from "locales/index";

interface Props {
  isFontsLoading: boolean;
  isDatabaseLoading: boolean;
}

const Register: React.FC<Props> = ({ isFontsLoading, isDatabaseLoading }) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const {
    state: {
      isDarkTheme,
      isHomeScreenLoading,
      hasPasswordPin,
      isLocalAuthentication,
    },
  } = useStore();

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
              `${i18n.t("alerts.ota.title")} (v${Constants.manifest?.version})`,
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

    const askUserStoreReview = async () => {
      try {
        const lastTimeAskedForReview = await AsyncStorage.getItem(
          userStoreReviewTimeItem
        );

        const askAgainForReview =
          lastTimeAskedForReview &&
          dayjs(lastTimeAskedForReview).isAfter(
            dayjs(new Date()).add(3, "days")
          );

        if (askAgainForReview || !lastTimeAskedForReview) {
          if (await StoreReview.hasAction()) {
            await StoreReview.requestReview();
            await AsyncStorage.setItem(
              userStoreReviewTimeItem,
              String(new Date())
            );
          }
        }
      } catch (error) {
        console.log("Error asking user for review = ", error);
      }
    };

    if (!isHomeScreenLoading && !isDev) {
      checkForOTA();
      askUserStoreReview();
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
