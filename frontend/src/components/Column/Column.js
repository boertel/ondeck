import React, { Fragment, useState } from 'react'
import { sortBy } from 'lodash'
import styled from 'styled-components/macro'

import { Tickets } from '../../ui'
import View from '../../ui/View'
import { AddQuickTicketForm } from '../../form'
import Ticket, { TicketPosition } from '../Ticket'
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

function Column({ id: columnId, name, tickets = [], ...props }) {
  return (
    <View flexDirection="column" {...props}>
      <Sticky alignItems="center">
        <ColumnTitle name={name} id={columnId}>{tickets.length > 0 && <>({tickets.length})</>}</ColumnTitle>
      </Sticky>
      <Tickets>
        <TicketPosition position={0} columnId={columnId} />
        {sortBy(tickets, 'position').map(ticket => (
          <Fragment key={ticket.key}>
            <Ticket to={`${ticket.key}`} {...ticket} />
            <TicketPosition position={ticket.position + 1} columnId={columnId} />
          </Fragment>
        ))}
      </Tickets>
      <Sticky>
        <AddQuickTicketForm column={columnId} />
      </Sticky>
    </View>
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
