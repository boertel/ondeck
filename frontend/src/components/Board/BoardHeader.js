import React from 'react'
import styled from 'styled-components'

import { useParams, useNavigate, } from 'react-router-dom'
import { Button, View } from '../../ui'
import { TrashIcon, AddIcon } from '../../ui/icons'
import { deleteBoard } from '../../resources/boards'
import AddBoardForm from '../../form/AddBoardForm'

const BoardHeader = ({ className, name, slug, onAddColumn, id, ...props }) => {
  const navigate = useNavigate()
  const { workspaceSlug } = useParams()
  const [ remove ] = deleteBoard({ workspaceSlug, boardSlug: slug })
  const onDelete = async () => {
    if (window.confirm(`Are you sure to remove board: ${name}?`)) {
      await remove()
      navigate(`/workspaces/${workspaceSlug}`)
    }
  }
  return (
    <View className={className} justifyContent="space-between" alignItems="center">
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

export default styled(BoardHeader)`
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: var(--fg);
`
