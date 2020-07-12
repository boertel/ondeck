import React from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../ui'
import { TrashIcon, PopoverIcon } from '../../ui/icons'
import { AddColumnForm } from '../../form'
import { deleteColumn } from '../../resources/columns'

function ColumnHeader({ name, id, children, ...props }) {
  const { workspaceSlug, boardSlug } = useParams()
  const onClick = () => deleteColumn({ workspaceSlug, boardSlug, columnId: id})
  return (
    <>
      <AddColumnForm name={name} id={id} />
      {children}
      <PopoverIcon />
      {/*<Button onClick={onClick}> <TrashIcon /> </Button>*/}
    </>
  )
}

export default ColumnHeader
