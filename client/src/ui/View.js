import React from 'react'
import styled from 'styled-components/macro'

const _View = React.forwardRef(({ alignItems, justifyContent, flexDirection, as: AsComponent, ...props }, ref) => {
  return <AsComponent {...props} ref={ref} />
});

const View = styled(_View)`
  border-radius: var(--border-radius);
  width: 100%;

  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`

View.defaultProps = {
  forwardedAs: 'div',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'row',
}

export default View;
