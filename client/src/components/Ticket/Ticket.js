import React from 'react'
import { transparentize } from 'polished';
import { Link, } from 'react-router-dom';
import styled from 'styled-components/macro';

import { useDrag } from 'react-dnd';

import { View } from '../../ui'

const TicketTitle = styled.h4`
  font-size: 16px;
  font-weight: normal;
  padding: 0;
  margin: 0;
`

const Ticket = ({ title, className, id, column: fromColumnId, board: fromBoardId, to, }) => {
  const [{ opacity }, drag] = useDrag({
    item: { type: 'TICKET', id, fromColumnId, fromBoardId, },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    })
  })
  return (
    <View as={Link} className={className} to={to} ref={drag} style={{ opacity, }}>
      <TicketTitle>{title}</TicketTitle>
    </View>
  )
}

export default styled(Ticket)`
  background-color: var(--fg);
  width: 100%;
  justify-content: flex-start;
  border: 2px solid transparent;
  padding: 10px;
  margin-bottom: 8px;
  transition-property: border-color, color, opacity;
  transition-duration: .2s;
  transition-timing-function: ease-in-out;
  border-radius: var(--border-radius);

  color: var(--default);
  text-decoration: none;
  outline: none;

  &:hover, &:focus {
    border-color: ${({ theme }) => transparentize(0.2, theme.primary)};
    outline: none;
    text-decoration: none;
  }

  &:focus {
  }
`
