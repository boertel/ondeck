import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useDrop } from 'react-dnd'
import classNames from 'classnames'

import { mutateTicket } from '../../resources/tickets'

function TicketPosition({ columnId, position, className, ...props }) {
  const accept = ['TICKET']

  const { workspaceSlug, boardSlug, ticketSlug } = useParams()
  const [mutate] = mutateTicket({ workspaceSlug, boardSlug, ticketSlug })

  const onDrop = useCallback(
    async ({ pk, fromColumnId, fromPosition }) => {
      const data = {
        pk,
        column: columnId,
        position,
      }
      if (columnId === fromColumnId) {
        data.position = fromPosition < position ? position - 1 : position
      }
      if (columnId !== fromColumnId || ![fromPosition, fromPosition + 1].includes(position)) {
        await mutate(data)
      }
    },
    [columnId, position, mutate]
  )

  const [{ isHover, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    canDrop: ({ fromPosition, fromColumnId }) => fromColumnId !== columnId || ![fromPosition, fromPosition + 1].includes(position),
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  return <div ref={drop} className={classNames(className, { canDrop, isHover })} {...props} />
}

export default styled(TicketPosition)`
  position: relative;
  border-radius: 1px;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  margin: 4px 0;
  transition: border-color 250ms ease-in-out;

  &.canDrop {
    &.isHover {
      border-color: var(--secondary);
    }
    &::before,
    &::after {
      content: ' ';
      position: absolute;
      right: 0;
      left: 0;
      height: 22px;
    }
    &::after {
      top: 0;
    }
    &::before {
      bottom: 0;
    }
  }
`
