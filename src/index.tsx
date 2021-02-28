import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import AppLoading from "expo-app-loading";
import Notification from "components/Notification";
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
  const {
    state: { isDarkTheme, isHomeScreenLoading, hasPasswordPin },
  } = useStore();

  const theme = isDarkTheme ? themeDark : themeLight;

  useEffect(() => {
    if (!isHomeScreenLoading && hasPasswordPin) {
      navigate("Password");
    }
  }, [isHomeScreenLoading, hasPasswordPin]);

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

const App: React.FC<Props> = (props) => {
  return (
    <StoreContextProvider>
      <Register {...props} />
    </StoreContextProvider>
  );
};

export default App;
