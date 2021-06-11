import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import cn from 'classnames'

function BoardMenuItem({ boardId, boardSlug, className, as: AsComponent, ...props }) {
  /*
  const onDrop = useCallback(
    async ({ pk, fromBoardSlug }) => {
      const data = {
        pk,
        board: boardId,
      }
      mutateTicket({ workspaceSlug }, data)
    },
    [boardId, workspaceSlug]
  )
  */

  return (
    <Droppable droppableId={JSON.stringify({ board: boardId })} type="TICKET" direction="vertical" isCombineEnabled>
      {(provided) => (
        <AsComponent ref={provided.innerRef} {...provided.droppableProps} {...props} className={cn(className)} />
      )}
    </Droppable>
  )
}

BoardMenuItem.defaultProps = {
  as: 'div',
}

export default BoardMenuItem
