import styled from 'styled-components/macro'
import View from './View';


const Column = styled(View)`
  height: 100%;
  border: 1px solid ${({ theme }) => theme.borderColor };
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;
`

export default Column
