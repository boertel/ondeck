import React from 'react'
import { useResource, useCache } from 'rest-hooks'

import WorkspaceResource from './resources/WorkspaceResource'
import BoardResource from './resources/BoardResource'

const Routes = () => {
  const slug = 'comedia'
  const workspace = useResource(WorkspaceResource.detailShape(), { slug })
  return (
    <>
      <div>{workspace.name}</div>
      <ul>{workspace.boards.map(slug => <Board key={slug} slug={slug} />)}</ul>
    </>
  )
}

const Board = ({ slug }) => {
  const board = useCache(BoardResource.detailShape(), { slug, });
  return <li>{board.name} {board.created_at}</li>
}

export default Routes

