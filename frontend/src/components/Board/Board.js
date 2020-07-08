import React, { useState, useCallback } from 'react'
import { isEqual, groupBy } from 'lodash'
import { useParams } from 'react-router-dom'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'

import BoardHeader from './BoardHeader'
import { Columns, View } from '../../ui'
import Column from '../Column'
import { AddColumnForm } from '../../form'
import { useColumns, useTickets, useBoards, mutateTicket } from '../../resources'

const Board = props => {
  const { workspaceSlug, boardSlug, ticketSlug } = useParams()

  const { data: board } = useBoards({ workspaceSlug, boardSlug, ticketSlug })
  const { data: columns = [] } = useColumns({ workspaceSlug, boardSlug, ticketSlug })
  const { data: tickets } = useTickets({ workspaceSlug, boardSlug, ticketSlug })

  const [mutate] = mutateTicket({ workspaceSlug, boardSlug })

  const [showAddColumnForm, setShowAddColumnForm] = useState(false)

  let ticketsGroupByColumns = {}
  if (tickets) {
    ticketsGroupByColumns = groupBy(tickets, 'column')
  }

  const onDragEnd = useCallback(function({ draggableId, type, source, destination }) {
    if (type === 'TICKET' && !isEqual(source, destination)) {
      const data = {
        pk: draggableId,
        column: parseInt(destination.droppableId, 10),
        position: destination.index,
      }
      mutate(data)
    }
  }, [mutate])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardHeader {...board} onAddColumn={() => setShowAddColumnForm(true)} />
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <Columns ref={provided.innerRef} {...provided.droppableProps}>
            {columns.map(({ id, name }, index) => (
              <Column key={id} id={id} index={index} tickets={ticketsGroupByColumns[id]} name={name} />
            ))}
            {(columns.length === 0 || showAddColumnForm) && (
              <View>
                <AddColumnForm cancel={() => setShowAddColumnForm(false)} />
              </View>
            )}
          </Columns>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Board
