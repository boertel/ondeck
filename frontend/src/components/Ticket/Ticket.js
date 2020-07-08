import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Draggable } from 'react-beautiful-dnd'

import { View } from '../../ui'

const TicketTitle = styled.h4`
  font-size: 16px;
  font-weight: normal;
  padding: 0;
  margin: 0;
`

const Ticket = React.memo(
  ({ title, className, pk, column: fromColumnId, board: fromBoardId, position, to }) => {
    return (
      <Draggable draggableId={pk} index={position}>
        {(provided, { isDragging }) => (
          <View
            forwardedAs={Link}
            classNames={[className, { isDragging }]}
            to={to}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TicketTitle>{title}</TicketTitle>
          </View>
        )}
      </Draggable>
    )
  }
)

export default styled(Ticket)`
  width: 100%;
  background-color: var(--fg);
  border-radius: var(--border-radius);
  border: 2px solid transparent;
  padding: 10px;
  margin-bottom: 12px;
  transition-property: border-color, color, opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  color: var(--default);
  text-decoration: none;
  outline: none;

  &.isDragging,
  &:hover,
  &:focus {
    border-color: var(--primary);
    outline: none;
    text-decoration: none;
  }

  &:focus {
  }
`
