import { useMyQuery, useMyMutation } from './utils'
import api from './api'

const defaultQueryFn = ({ workspaceSlug, boardSlug }) =>
  fetch(`/api/v1/workspaces/${workspaceSlug}/boards/${boardSlug}/tickets/`).then(res => res.json())

const getApiParameters = ({ workspaceSlug, boardSlug }) => pk => {
  let method = 'post'
  let path = ['', 'api', 'v1', 'workspaces', workspaceSlug]
  if (boardSlug) {
    path = path.concat(['boards', boardSlug])
  }
  path.push('tickets')
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

export const defaultMutationFn = ({ workspaceSlug, boardSlug }) => data => {
  const { method, path } = getApiParameters({ workspaceSlug, boardSlug })(data.id)
  return api[method](path, data).then(({ data }) => data)
}

const deleteFn = ({ workspaceSlug, boardSlug }) => pk => {
  return api.delete(`/api/v1/workspaces/${workspaceSlug}/boards/${boardSlug}/tickets/${pk}/`).then(({ data }) => ({}))
}

export const useTickets = useMyQuery('tickets', defaultQueryFn)
export const mutateTicket = useMyMutation('tickets', defaultMutationFn)
export const deleteTicket = useMyMutation('tickets', deleteFn)
