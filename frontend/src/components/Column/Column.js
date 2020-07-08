import React, { useCallback } from 'react'
import classNames from 'classnames'
import { sortBy } from 'lodash'
import styled from 'styled-components/macro'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { Tickets } from '../../ui'
import View from '../../ui/View'
import { AddQuickTicketForm } from '../../form'
import Ticket from '../Ticket'
import ColumnTitle from './ColumnTitle'

const Sticky = styled(View)`
  position: sticky;
  right: 0;
  left: 0;
  padding: 10px;
  z-index: 1;

  background-color: var(--bg);

  &:first-child {
    top: 60px;
    padding-bottom: 0;
  }

  &:last-child {
    padding-top: 0;
    bottom: 0;
    top: 122px; // header + ColumnTitle (TODO definitely need a better solution)
  }
`


function Column({ id: columnId, name, index, className, tickets = [], ...props }) {
  const sorted = sortBy(tickets, 'position')

  const dndId = `${columnId}`
  return (
    <Draggable draggableId={dndId} index={index}>{(provided) => (
      <View flexDirection="column" className={className} ref={provided.innerRef} {...provided.draggableProps}>
        <Sticky alignItems="center" {...provided.dragHandleProps}>
          <ColumnTitle name={name} id={columnId}>
            {tickets.length > 0 && <>({tickets.length})</>}
          </ColumnTitle>
        </Sticky>
        <Droppable droppableId={dndId} type="TICKET">
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
          <AddQuickTicketForm column={columnId} />
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
