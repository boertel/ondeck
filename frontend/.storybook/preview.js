import React from 'react'
import { ThemeProvider } from 'styled-components'
import { addDecorator } from '@storybook/react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import theme, { GlobalStyle } from '../src/theme'

addDecorator(story => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <DndProvider backend={Backend}>
        {story()}
      </DndProvider>
    </ThemeProvider>
  </>
))
