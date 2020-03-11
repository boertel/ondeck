import React, { useState } from 'react'
import { groupBy } from 'lodash'
import { useParams, useRouteMatch, Link } from 'react-router-dom'

import BoardHeader from './BoardHeader'
import { Columns, Tickets, } from '../../ui'
import Column, { ColumnTitle } from '../Column'
import Ticket from '../Ticket'
import { AddColumnForm } from '../../form'
import { AddIcon } from '../../ui/icons'

import { useColumns, useTickets, useBoards } from '../../resources'

const Board = props => {
  const { url } = useRouteMatch()
  const { columns } = useColumns('columns')
  const { tickets } = useTickets('tickets')
  const { data: board } = useBoards(['boards', useParams()])

  const [showAddColumnForm, setShowAddColumnForm] = useState(false)

  let ticketsGroupByColumns = {}
  if (tickets) {
    ticketsGroupByColumns = groupBy(tickets, 'column')
  }

  // TODO why so many console.log/render?
  //console.log(columns)

  return (
    <>
      {board && <BoardHeader {...board} onAddColumn={() => setShowAddColumnForm(true)}/>}
      <Columns>
        {columns &&
          columns.map(({ id, name }) => (
            <Column key={id} id={id}>
              <ColumnTitle name={name} id={id} />
              <Tickets>
                {(ticketsGroupByColumns[id] || []).map(ticket => (
                  <Ticket key={ticket.key} to={`${url}/${ticket.key}`} {...ticket} />
                ))}
              </Tickets>
              <Link to={{ pathname: `${url}/new`, search: `?column=${id}` }}>
                <AddIcon /> New Ticket
              </Link>
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
