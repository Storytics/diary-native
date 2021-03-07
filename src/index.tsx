import React, { useEffect, useRef, useState } from "react";
import { StatusBar, View, AppState, AppStateStatus } from "react-native";
import AppLoading from "expo-app-loading";
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

interface Props {
  fontsLoaded: boolean;
  isDatabaseLoading: boolean;
}

const Register: React.FC<Props> = ({ fontsLoaded, isDatabaseLoading }) => {
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

  if ((!fontsLoaded && isDatabaseLoading) || isHomeScreenLoading) {
    return <AppLoading />;
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
