import React from "react";
import { StatusBar, View } from "react-native";
import AppLoading from "expo-app-loading";
// Styles
import { ThemeProvider } from "styled-components/native";
import themeLight from "theme/index";
import themeDark from "theme/dark";
// Navigation
import Navigation from "navigation/index";
// Contexts
import { ModalsContextProvider } from "context/ModalsContext";
import { StoreContextProvider } from "context/StoreContext";
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
    state: { isDarkTheme, isHomeScreenLoading },
  } = useStore();

  const theme = isDarkTheme ? themeDark : themeLight;

  if ((!fontsLoaded && isDatabaseLoading) || isHomeScreenLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <ModalsContextProvider>
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
