import React from 'react'
import styled from 'styled-components/macro'
import { View } from '../ui'


// TODO better more abstract scrolling component
// also add classnames to add padding-right if scrollbar is present
const Tickets = ({ children, ...props }) => {
  return <View {...props}><div>{children}</div></View>
}

export default styled(Tickets)`
  flex-direction: column;
  > div {
    width: 100%;
  }
`
