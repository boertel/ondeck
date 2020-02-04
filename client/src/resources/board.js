import { useMyQuery, useMyMutation } from './utils'

import api from "./api";


const defaultQueryFn = ({ workspaceSlug, boardSlug, }) => fetch(`/api/v1/workspaces/${workspaceSlug}/boards/${boardSlug}/`).then(res => res.json())

const defaultMutationFn = ({ workspaceSlug, boardSlug }) => data => {
  let path = ['', 'api', 'v1', 'workspaces', workspaceSlug, 'boards']
  let method = 'post'
  if (boardSlug) {
    method = 'patch'
    path.push(boardSlug)
  }
  path.push('')
  return api[method](path.join('/'), data).then(({ data }) => data)
}


export const useBoard = useMyQuery('board', defaultQueryFn)
export const mutateBoard = useMyMutation('board', defaultMutationFn)
