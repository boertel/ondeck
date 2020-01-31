import styled from 'styled-components/macro'

export default styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: ${({ theme }) => theme.radius};
  width: 100%;
`
