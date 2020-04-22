import React from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../ui'
import { TrashIcon } from '../../ui/icons'
import { AddColumnForm } from '../../form'
import { deleteColumn } from '../../resources/columns'

function ColumnTitle({ name, id, children, ...props }) {
  const { workspaceSlug, boardSlug } = useParams()
  const [removeColumn] = deleteColumn({ workspaceSlug, boardSlug })
  return (
    <>
      <AddColumnForm name={name} id={id} />
      {children}
      <Button onClick={() => removeColumn(id)}>
        <TrashIcon />
      </Button>
    </>
  )
}

export default ColumnTitle
