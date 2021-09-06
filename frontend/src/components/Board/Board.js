import React, { useState } from 'react'
import { groupBy } from 'lodash'
import { useParams } from 'react-router-dom'
import { Droppable } from 'react-beautiful-dnd'

import BoardHeader from './BoardHeader'
import { BrowserTitle, Columns, View } from '../../ui'
import Column from '../Column'
import { AddColumnForm } from '../../form'
import { useColumns, useTickets, useBoards } from '../../resources'

const Board = ({ zoom, openSidebar }) => {
  const { workspaceSlug, boardSlug, ticketSlug } = useParams()

  const { data: board } = useBoards({ workspaceSlug, boardSlug, ticketSlug })
  const { data: columns, errors } = useColumns({ workspaceSlug, boardSlug, ticketSlug })
  const { data: tickets } = useTickets({ workspaceSlug, boardSlug })

  const isLoading = !columns && !errors

  const [showAddColumnForm, setShowAddColumnForm] = useState(false)

  let ticketsGroupByColumns = {}
  if (tickets) {
    ticketsGroupByColumns = groupBy(tickets, 'column')
  }

  return (
    <>
      <BrowserTitle>{board?.name}</BrowserTitle>
      <BoardHeader {...board} openSidebar={openSidebar} onAddColumn={() => setShowAddColumnForm(true)} />
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <Columns ref={provided.innerRef} {...provided.droppableProps}>
            {(columns || []).map(({ id, name }, index) => (
              <Column key={id} id={id} index={index} tickets={ticketsGroupByColumns[id]} name={name} />
            ))}
            {!isLoading && (columns.length === 0 || showAddColumnForm) && (
              <View>
                <AddColumnForm cancel={() => setShowAddColumnForm(false)} />
              </View>
            )}
          </Columns>
        )}
      </Droppable>
    </>
  )
}

export default Board
