import React from 'react'

import { useParams, useHistory, } from 'react-router-dom'
import { Button, View } from '../../ui'
import { TrashIcon, AddIcon } from '../../ui/icons'
import { deleteBoard } from '../../resources/board'

const BoardHeader = ({ name, slug, onAddColumn, id, ...props }) => {
  const history = useHistory()
  const { workspaceSlug } = useParams()
  const [ remove ] = deleteBoard(null, {refetchQueries: [['boards', { workspaceSlug, }]]})
  const onDelete = async () => {
    await remove(slug)
    history.push(`/workspaces/${workspaceSlug}`)
  }
  return (
    <View justifyContent="space-between" alignItems="center">
      <h4>{name}</h4>
      <div>
        <Button onClick={onAddColumn}>
          <AddIcon />
        </Button>
        <Button onClick={onDelete}>
          <TrashIcon />
        </Button>
      </div>
    </View>
  )
}

export default BoardHeader
