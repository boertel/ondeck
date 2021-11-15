import React from 'react'
import { useParams } from 'react-router-dom'

import { deleteColumn } from '../../resources/columns'
import { TrashIcon } from '../../ui/icons'
import { Button } from '../../ui'
import { AddColumnForm } from '../../form'

export default function ColumnHeader({ name, id, children, ...props }) {
  const { workspaceSlug, boardSlug } = useParams()
  const handleDeleteColumn = () => {
    if (window.confirm(`Are you sure you want to delete column: ${name}?`)) {
      deleteColumn({ workspaceSlug, boardSlug, columnId: id })
    }
  }
  return (
    <>
      <AddColumnForm name={name} id={id} />
      {children}
      <Button onClick={handleDeleteColumn}>
        <TrashIcon />
      </Button>
    </>
  )
}
