import React, { useState } from 'react'
import { groupBy } from 'lodash'
import { useParams, } from 'react-router-dom'

import BoardHeader from './BoardHeader'
import { Columns, Tickets } from '../../ui'
import Column, { ColumnTitle } from '../Column'
import Ticket from '../Ticket'
import { AddColumnForm, AddQuickTicketForm, } from '../../form'
import { useColumns, useTickets, useBoards } from '../../resources'

const Board = props => {
  const params = useParams()

  const { data: board } = useBoards(params)
  const { data: columns } = useColumns(params)
  const { data: tickets } = useTickets(params)

  const [showAddColumnForm, setShowAddColumnForm] = useState(false)

  let ticketsGroupByColumns = {}
  if (tickets) {
    ticketsGroupByColumns = groupBy(tickets, 'column')
  }

  return (
    <>
      <BoardHeader {...board} onAddColumn={() => setShowAddColumnForm(true)} />
      <Columns>
        {columns &&
          columns.map(({ id, name }) => (
            <Column key={id} id={id}>
              <ColumnTitle name={name} id={id} />
              <Tickets>
                <AddQuickTicketForm column={id} />
                {(ticketsGroupByColumns[id] || []).map(ticket => (
                  <Ticket key={ticket.key} to={`${ticket.key}`} {...ticket} />
                ))}
              </Tickets>
            </Column>
          ))}
        {showAddColumnForm && (
          <Column>
            <AddColumnForm />
          </Column>
        )}
      </Columns>
    </>
  )
}

export default Board
