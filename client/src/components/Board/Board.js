import React, { useState } from 'react'
import { groupBy } from 'lodash'
import { useParams, } from 'react-router-dom'

import BoardHeader from './BoardHeader'
import { Columns, } from '../../ui'
import Column from '../Column'
import { AddColumnForm, } from '../../form'
import { useColumns, useTickets, useBoards } from '../../resources'

const Board = props => {
  const { workspaceSlug, boardSlug, ticketSlug } = useParams()

  const { data: board } = useBoards({ workspaceSlug, boardSlug, ticketSlug })
  const { data: columns } = useColumns({ workspaceSlug, boardSlug, ticketSlug })
  const { data: tickets } = useTickets({ workspaceSlug, boardSlug, ticketSlug })

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
            <Column key={id} id={id} tickets={ticketsGroupByColumns[id]} name={name}>
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
