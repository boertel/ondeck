import React from 'react'
import styled from 'styled-components'

import { useParams, useNavigate } from 'react-router-dom'
import { Button, View } from '../../ui'
import { TrashIcon, AddIcon } from '../../ui/icons'
import { deleteBoard } from '../../resources/boards'
import AddBoardForm from '../../form/AddBoardForm'

const BoardHeader = ({ className, name, slug, onAddColumn, id, openSidebar, ...props }) => {
  const navigate = useNavigate()
  const { workspaceSlug } = useParams()
  const onDelete = async () => {
    if (window.confirm(`Are you sure to remove board: ${name}?`)) {
      deleteBoard({ workspaceSlug, boardSlug: slug })
      navigate(`/workspaces/${workspaceSlug}`)
    }
  }
  return (
    <View className={className} justifyContent="space-between" alignItems="center">
      <View as="h4" alignItems="center" $width="auto">
        <SidebarIcon onClick={openSidebar} />
        <AddBoardForm name={name} />
      </View>
      <View $width="auto">
        <Button onClick={onAddColumn}>
          <AddIcon />
        </Button>
        <Button onClick={onDelete}>
          <TrashIcon />
        </Button>
      </View>
    </View>
  )
}

const SidebarIcon = styled(({ className, onClick }) => {
  return (
    <button onClick={onClick} className={className}>
      ⛵️
    </button>
  )
})`
  border: none;
  background: transparent;
  font-size: 1.1em;
  display: none;
  @media (max-width: ${({ theme: { devices } }) => devices.small}) {
    display: block;
  }
`

export default styled(BoardHeader)`
  position: sticky;
  z-index: 1;
  top: 0;
  background-color: var(--fg);
`
