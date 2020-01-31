import React from 'react'
import styled from 'styled-components/macro'
import View from './View'


export default styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: repeat(${({ children }) => React.Children.count(children)}, 1fr);
  width: 100%;
  height: 100%;
`
