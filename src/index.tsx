import React from "react";
import { StatusBar, View } from "react-native";
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

const Register: React.FC = () => {
  const {
    state: { isDarkTheme },
  } = useStore();

  const theme = isDarkTheme ? themeDark : themeLight;

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

const App: React.FC = () => {
  return (
    <StoreContextProvider>
      <Register />
    </StoreContextProvider>
  );
};

export default App;
