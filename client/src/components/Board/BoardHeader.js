import React from 'react'
import styled from 'styled-components/macro'

import { useParams, useHistory, } from 'react-router-dom'
import { Button, View } from '../../ui'
import { TrashIcon } from '../../ui/icons'
import { deleteBoard } from '../../resources/board'

const BoardHeader = ({ name, slug, ...props }) => {
  const history = useHistory()
  const { workspaceSlug } = useParams()
  const [ remove ] = deleteBoard(null, {refetchQueries: [['boards', { workspaceSlug, }]]})
  const onDelete = async () => {
    await remove(slug)
    history.push(`/workspaces/${workspaceSlug}`)
  }
  return (
    <View as="header" {...props}>
      <h4>{name}</h4>
      <div>
        <Button onClick={onDelete}>
          <TrashIcon />
        </Button>
      </div>
    </View>
  )
}

export default styled(BoardHeader)`
  margin-bottom: 12px;
  justify-content: space-between;
`
