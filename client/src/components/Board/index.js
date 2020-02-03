import React, { useCallback } from 'react'
import { useDrop } from 'react-dnd'
import classNames from 'classnames'
import { useParams } from 'react-router-dom'

import { mutateTicket } from '../../resources/tickets'


function Board({ boardId, className, as: AsComponent, ...props }) {
  const [ mutate ] = mutateTicket(useParams())

  const onDrop = useCallback((ticket) => {
    console.log(ticket)
    mutate({
      id: ticket.id,
      board: boardId,
    })
  }, [boardId, mutate])

  const accept = ['TICKET']

  const [{ isHover, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  })

  return (
    <AsComponent ref={drop} {...props} className={classNames(className, { isHover, canDrop })} />
  )
}

Board.defaultProps = {
  as: 'div'
}

export default Board
