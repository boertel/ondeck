import React from 'react'
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

const Ticket = React.memo(({ title, className, pk, column: fromColumnId, board: fromBoardId, position: fromPosition, to, }) => {
  const [{ opacity, }, drag] = useDrag({
    item: { type: 'TICKET', pk, fromColumnId, fromBoardId, fromPosition, },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    })
  })
  return (
    <View forwardedAs={Link} className={className} to={to} ref={drag} style={{ opacity }}>
      <TicketTitle>{title}<sup>{fromPosition}</sup></TicketTitle>
    </View>
  )
})

export default styled(Ticket)`
  width: 100%;
  background-color: var(--fg);
  border-radius: var(--border-radius);
  border: 2px solid transparent;
  padding: 10px;
  transition-property: border-color, color, opacity;
  transition-duration: .2s;
  transition-timing-function: ease-in-out;

  color: var(--default);
  text-decoration: none;
  outline: none;

  &:hover, &:focus {
    border-color: var(--primary);
    outline: none;
    text-decoration: none;
  }

  &:focus {
  }
`
