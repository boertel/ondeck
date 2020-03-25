import React from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { ThemeProvider } from 'styled-components'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import './App.css'

import Routes from './Routes'
import Favicon from './ui/Favicon'
import theme, { GlobalStyle } from './theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Favicon emoji="⛵️" />
      <GlobalStyle />
      <DndProvider backend={Backend}>
        <Routes />
      </DndProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  )
}

export default App
