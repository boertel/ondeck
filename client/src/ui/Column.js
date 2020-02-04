import React, { useCallback } from 'react'
import classNames from 'classnames'
import styled from 'styled-components/macro'
import { useDrop } from 'react-dnd'

import { mutateTicket } from '../resources/tickets'
import View from './View';


function Column({ id: columnId, className, ...props }) {
  const accept = ['TICKET']

  const [ mutate ] = mutateTicket()
  const onDrop = useCallback(({ id, fromColumnId }) => {
    if (columnId !== fromColumnId) {
      mutate({
        id,
        column: columnId,
      })
    }
  }, [columnId, mutate])

  const [{ isHover, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop(),
    })
  })
  return (
    <View {...props} ref={drop} className={classNames(className, {canDrop, isHover, })} />
  )
}

export default styled(Column)`
  height: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.borderColor };
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px;

  transition-property: background-color, border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  &.canDrop {
    border-style: dashed;
    border-color: ${({ theme }) => theme.primary};
    border-width: 1px;
  }

  &.isHover {
    background-color: ${({ theme }) => theme.hoverBackground};
  }
`
