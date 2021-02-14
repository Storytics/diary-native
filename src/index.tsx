import React from "react";
import { StatusBar } from "react-native";
// Styles
import { ThemeProvider } from "styled-components/native";
import theme from "theme/index";
// Navigation
import Navigation from "navigation/index";
// Contexts
import { ModalsContextProvider } from "context/ModalsContext";
import { StoreContextProvider } from "context/StoreContext";
// Modals
import Modals from "modals/index";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <StoreContextProvider>
        <ModalsContextProvider>
          <StatusBar
            backgroundColor={theme.container.backgroundColor}
            barStyle="dark-content"
          />
          <Navigation />
          <Modals />
        </ModalsContextProvider>
      </StoreContextProvider>
    </ThemeProvider>
  );
};

export default App;
