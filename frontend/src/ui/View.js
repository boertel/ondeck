import React from 'react'
import styled from 'styled-components/macro'

const _View = React.forwardRef(({ alignItems, radius, justifyContent, flexDirection, as: AsComponent, ...props }, ref) => {
  return <AsComponent {...props} ref={ref} />
});

const View = styled(_View)`
  width: 100%;

  display: flex;
  border-radius: ${({ radius }) => radius};
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`

View.defaultProps = {
  forwardedAs: 'div',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  radius: 'var(--border-radius)',
}

export default View;
