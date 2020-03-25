import styled from 'styled-components/macro'

const View = styled.div`
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
