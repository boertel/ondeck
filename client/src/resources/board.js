import { useMyQuery, useMyMutation } from './utils'

import api from './api'

const getApiParameters = ({ workspaceSlug, }) => pk => {
  let method = 'post'
  let path = ['', 'api', 'v1', 'workspaces', workspaceSlug, 'boards']
  if (pk) {
    path.push(pk)
    method = method || 'patch'
  }
  path.push('')
  return {
    path: path.join('/'),
    method,
  }
}

const defaultQueryFn = (key, params) => {
  // TODO update when needed to request one board (it needs const getPk = () => boardSlug)
  const { path, } = getApiParameters(params)(params.boardSlug)
  return api.get(path).then(({ data }) => data)
}

const defaultMutationFn = ({ workspaceSlug, boardSlug }) => data => {
  const { path, method } = getApiParameters({ workspaceSlug })(boardSlug)
  return api[method](path, data).then(({ data }) => data)
}

const deleteFn = ({ workspaceSlug, boardSlug }) => () => {
  const { path, } = getApiParameters({ workspaceSlug })(boardSlug)
  return api.delete(path).then(() => {})
}

export const useBoards = useMyQuery('boards', defaultQueryFn)
export const mutateBoard = useMyMutation('boards', defaultMutationFn)
export const deleteBoard = useMyMutation('boards', deleteFn)
