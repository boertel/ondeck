import React from 'react'
import { sortBy } from 'lodash'
import styled from 'styled-components'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { Tickets, View, Sticky } from '../../ui'
import { AddQuickTicketForm } from '../../form'
import Ticket from '../Ticket'
import ColumnHeader from './ColumnHeader'


function Column({ id: columnId, name, index, className, tickets = [], ...props }) {
  const sorted = sortBy(tickets, 'position')

  const dndId = `${columnId}`
  return (
    <Draggable draggableId={dndId} index={index}>
      {provided => (
        <View flexDirection="column" className={className} ref={provided.innerRef} {...provided.draggableProps}>
          <Sticky alignItems="center" style={{paddingBottom: '6px'}} {...provided.dragHandleProps}>
            <ColumnHeader name={name} id={columnId}>
            </ColumnHeader>
          </Sticky>
          <Droppable droppableId={JSON.stringify({"column": columnId})} type="TICKET">
            {(provided, snapshot) => (
              <Tickets {...provided.droppableProps} ref={provided.innerRef}>
                {sorted.map(ticket => (
                  <Ticket key={ticket.key} to={`${ticket.key}`} {...ticket} index={ticket.position} />
                ))}
                {provided.placeholder}
              </Tickets>
            )}
          </Droppable>
          <Sticky>
            <AddQuickTicketForm column={columnId} isFirst={index === 0} />
          </Sticky>
        </View>
      )}
    </Draggable>
  )
}

export default styled(Column)`
  position: relative;
  background-color: var(--bg);

  transition-property: background-color, border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  &.canDrop {
    border-style: dashed;
    border-color: var(--primary);
    border-width: 1px;
  }

  &.isHover {
    background-color: var(--primary-hover);
  }
`
