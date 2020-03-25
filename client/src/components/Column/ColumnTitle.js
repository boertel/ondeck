import React, { useState } from 'react'
import { useRouteMatch, } from 'react-router-dom'
import styled from 'styled-components/macro'

import { View, Button } from '../../ui'
import { EditIcon, TrashIcon, AddIcon } from '../../ui/icons'
import { AddColumnForm } from '../../form'
import { deleteColumn } from '../../resources/columns'

function ColumnTitle({ className, name, id, ...props }) {
  const { url } = useRouteMatch()
  const [removeColumn] = deleteColumn()
  const [readOnly, setReadOnly] = useState(true)
  return (
    <View>
      <AddColumnForm name={name} id={id} readOnly={readOnly} />
      <Button>
        <EditIcon />
      </Button>
      <Button onClick={() => removeColumn(id)}>
        <TrashIcon />
      </Button>
      <Button to={{ pathname: `${url}/new`, search: `?column=${id}` }} className="primary">
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
