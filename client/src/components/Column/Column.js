import React, { Fragment, useState, } from 'react'
import { sortBy } from 'lodash'
import styled from 'styled-components/macro'

import { Tickets } from '../../ui'
import View from '../../ui/View'
import Ticket, { TicketPosition } from '../Ticket'
import ColumnTitle from './ColumnTitle'
import { AddQuickTicketForm } from '../../form'


function Column({ id: columnId, name, tickets=[], ...props }) {
  const [addTicket, setAddTicket] = useState(false)

  return (
    <View flexDirection="column" {...props}>
      <ColumnTitle name={name} id={columnId} onAdd={() => setAddTicket(!addTicket)} />
      <Tickets>
        {addTicket && (<AddQuickTicketForm column={columnId} cancel={() => setAddTicket(false)} />)}
        <TicketPosition position={0} columnId={columnId} />
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
