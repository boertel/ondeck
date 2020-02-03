import React from "react";
import { ThemeProvider } from "styled-components";
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import "./App.css";

import Routes from "./Routes";
import theme, { GlobalStyle } from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <DndProvider backend={Backend}>
        <Routes />
      </DndProvider>
    </ThemeProvider>
  );
};

export default App;
