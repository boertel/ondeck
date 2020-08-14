import React, { useCallback } from 'react'
import {useParams} from 'react-router-dom'
import { useDrop } from 'react-dnd'
import classNames from 'classnames'

import { mutateTicket, } from '../../resources/tickets'

function BoardMenuItem({ boardId, boardSlug, className, as: AsComponent, ...props }) {
  const { workspaceSlug, } = useParams()

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

  const accept = ['TICKET']

  const [{ isHover, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return <AsComponent ref={drop} {...props} className={classNames(className, { isHover, canDrop })} />
}

BoardMenuItem.defaultProps = {
  as: 'div',
}

export default BoardMenuItem
