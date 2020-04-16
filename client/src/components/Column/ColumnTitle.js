import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'

import { View, Button } from '../../ui'
import { EditIcon, TrashIcon, AddIcon } from '../../ui/icons'
import { AddColumnForm } from '../../form'
import { deleteColumn } from '../../resources/columns'

function ColumnTitle({ className, name, id, onAdd, ...props }) {
  const { workspaceSlug, boardSlug } = useParams()
  const [removeColumn] = deleteColumn({ workspaceSlug, boardSlug })
  return (
    <View>
      <AddColumnForm name={name} id={id} />
      <Button>
        <EditIcon />
      </Button>
      <Button onClick={() => removeColumn(id)}>
        <TrashIcon />
      </Button>
      <Button onClick={onAdd} className="primary">
        <AddIcon />
      </Button>
    </View>
  )
}

export default styled(ColumnTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  padding: 0;
  margin-bottom: 12px;
`
