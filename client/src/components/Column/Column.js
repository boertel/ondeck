import React, { Fragment, useState, useCallback } from 'react'
import { sortBy } from 'lodash'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import styled from 'styled-components/macro'
import { useDrop } from 'react-dnd'

import { mutateTicket } from '../../resources/tickets'
import { Tickets } from '../../ui'
import View from '../../ui/View'
import Ticket from '../Ticket'
import ColumnTitle from './ColumnTitle'
import { AddQuickTicketForm } from '../../form'


function TicketPosition({ columnId, position, ...props }) {
  const accept = ['TICKET']

  const { workspaceSlug, boardSlug, ticketSlug } = useParams()
  const [mutate] = mutateTicket({ workspaceSlug, boardSlug, ticketSlug })

  const onDrop = useCallback(
    ({ pk, fromColumnId, fromPosition }) => {
      const data = {
        pk,
        column: columnId,
        position,
      }
      console.log(data)
      if (columnId !== fromColumnId || position !== fromPosition) {
        mutate(data)
      }
    },
    [columnId, position, mutate]
  )

  const [{ isHover, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return <div ref={drop} className={classNames({ canDrop, isHover })} style={{ height: '100px'}} {...props} />
}

function Column({ id: columnId, name, tickets=[], ...props }) {
  const [addTicket, setAddTicket] = useState(false)

  return (
    <View flexDirection="column" {...props}>
      <ColumnTitle name={name} id={columnId} onAdd={() => setAddTicket(!addTicket)} />
      <Tickets>
        {addTicket && (<AddQuickTicketForm column={columnId} cancel={() => setAddTicket(false)} />)}
        {sortBy(tickets, 'position').map(ticket => (
          <Fragment key={ticket.key}>
            <Ticket to={`${ticket.key}`} {...ticket} />
            <TicketPosition position={ticket.position + 1} columnId={columnId} />
          </Fragment>
        ))}
      </Tickets>
    </View>
  )
}

export default styled(Column)`
  height: 100%;
  background-color: var(--bg);
  padding: 10px;

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
