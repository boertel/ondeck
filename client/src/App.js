import React from "react";
import { ThemeProvider } from "styled-components";

import "./App.css";

import Routes from "./Routes";
import theme, { GlobalStyle } from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
