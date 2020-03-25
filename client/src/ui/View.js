import React from 'react'
import styled from 'styled-components/macro'

const View = styled(({ alignItems, justifyContent, ...props }) => <div {...props} />)`
  display: flex;
  border-radius: var(--border-radius);
  width: 100%;

  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`

View.defaultProps = {
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
}

export default View;
