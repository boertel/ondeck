import React from 'react'
import { ReactQueryDevtools } from 'react-query-devtools'
import { ReactQueryConfigProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import Routes from './Routes'
import Favicon from './ui/Favicon'
import theme, { GlobalStyle } from './theme'

const queryConfig = { refetchAllOnWindowFocus: false }

const App = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <ThemeProvider theme={theme}>
        <Favicon emoji="⛵️" />
        <GlobalStyle />
        <DndProvider backend={Backend}>
          <Routes />
        </DndProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </ReactQueryConfigProvider>
  )
}

export default App
