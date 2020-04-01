import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'
import styled from 'styled-components/macro'
import { useDrop } from 'react-dnd'

import { mutateTicket } from '../../resources/tickets'
import View from '../../ui/View';


function Column({ id: columnId, className, ...props }) {
  const accept = ['TICKET']

  const params = useParams()
  const [ mutate ] = mutateTicket(params)

  const onDrop = useCallback(({ pk, fromColumnId }) => {
    if (columnId !== fromColumnId) {
      mutate({
        pk,
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
    <View flexDirection="column" {...props} ref={drop} className={classNames(className, {canDrop, isHover, })} />
  )
}

export default styled(Column)`
  height: 100%;
  background-color: var(--bg);
  padding: 10px;

  transition-property: background-color, border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  &.canDrop {
    border-style: dashed;
    border-color: var(--primary);
    border-width: 1px;
  }

  &.isHover {
    background-color: var(--primary-hover);
  }
`

