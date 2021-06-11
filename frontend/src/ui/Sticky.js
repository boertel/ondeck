import styled from 'styled-components'
import View from './View'

const Sticky = styled(View)`
  position: sticky;
  right: 0;
  left: 0;
  padding: 8px;
  z-index: 1;

  background-color: var(--bg);

  &:first-child {
    top: 48px;
    padding-bottom: 0;
  }

  &:last-child {
    padding-top: 0;
    bottom: 0;
    top: 109px; // header + ColumnTitle (TODO definitely need a better solution)
  }
`

export default Sticky
