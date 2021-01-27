import React from "react";
// Styles
import { ThemeProvider } from "styled-components/native";
import theme from "theme/index";
// Navigation
import Navigation from "navigation/index";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
