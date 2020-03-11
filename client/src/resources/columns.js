import { useMyMutation, useMyQuery } from './utils'
import api from './api'

const getApiParameters = ({ workspaceSlug, boardSlug }) => pk => {
  let method = 'post'
  let path = ['', 'api', 'v1', 'workspaces', workspaceSlug, 'boards', boardSlug, 'columns']
  if (pk) {
    path.push(pk)
    method = 'patch'
  }
  path.push('')
  return {
    path: path.join('/'),
    method,
  }
}

const defaultQueryFn = (key, { workspaceSlug, boardSlug }) =>
  api(`/api/v1/workspaces/${workspaceSlug}/boards/${boardSlug}/columns/`).then(({ data }) => data)

const defaultMutationFn = ({ workspaceSlug, boardSlug }) => data => {
  const { path, method } = getApiParameters({ workspaceSlug, boardSlug })(data.id)
  return api[method](path, data).then(({ data }) => data)
}

const deleteFn = ({ workspaceSlug, boardSlug }) => pk =>
  api.delete(`/api/v1/workspaces/${workspaceSlug}/boards/${boardSlug}/columns/${pk}`).then(() => ({}))

export const useColumns = useMyQuery('columns', defaultQueryFn)
export const mutateColumn = useMyMutation('columns', defaultMutationFn)
export const deleteColumn = useMyMutation('columns', deleteFn)
