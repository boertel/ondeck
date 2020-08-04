import React from 'react'
import { ThemeProvider } from 'styled-components'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './hooks/useModal'
import { Manager as PopperManager } from 'react-popper'

import Routes from './Routes'
import Favicon from './ui/Favicon'
import theme, { GlobalStyle } from './theme'
import { CommandQuery } from './components/Command'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Favicon emoji="⛵️" />
      <GlobalStyle />
      <BrowserRouter>
        <PopperManager>
          <DndProvider backend={HTML5Backend}>
            <ModalProvider>
              <CommandQuery>
                <Routes />
              </CommandQuery>
            </ModalProvider>
          </DndProvider>
        </PopperManager>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
