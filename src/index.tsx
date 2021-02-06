import React from "react";
// Styles
import { ThemeProvider } from "styled-components/native";
import theme from "theme/index";
// Navigation
import Navigation from "navigation/index";
// Context
import { EditorProvider } from "context/EditorContext";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <EditorProvider>
        <Navigation />
      </EditorProvider>
    </ThemeProvider>
  );
};

export default App;
