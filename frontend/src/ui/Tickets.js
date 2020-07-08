import React from 'react'
import styled from 'styled-components/macro'
import { View } from '../ui'


// TODO better more abstract scrolling component
// also add classnames to add padding-right if scrollbar is present
const Tickets = React.forwardRef(({ children, ...props }, ref) => {
  return <View {...props} ref={ref}>{children}</View>
})

export default styled(Tickets)`
  padding: 0 10px;
  flex-direction: column;
  > div {
    width: 100%;
  }
`
