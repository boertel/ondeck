import React from 'react'

import { useParams, useNavigate, } from 'react-router-dom'
import { Button, View } from '../../ui'
import { TrashIcon, AddIcon } from '../../ui/icons'
import { deleteBoard } from '../../resources/boards'
import AddBoardForm from '../../form/AddBoardForm'

const BoardHeader = ({ name, slug, onAddColumn, id, ...props }) => {
  const navigate = useNavigate()
  const { workspaceSlug } = useParams()
  const [ remove ] = deleteBoard({ workspaceSlug, boardSlug: slug })
  const onDelete = async () => {
    await remove()
    navigate(`/workspaces/${workspaceSlug}`)
  }
  return (
    <View justifyContent="space-between" alignItems="center">
      <h4><AddBoardForm name={name} /></h4>
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
