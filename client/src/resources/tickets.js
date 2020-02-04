import { useMyQuery, useMyMutation } from './utils'
import api from './api'

const defaultQueryFn = ({ workspaceSlug, boardSlug }) =>
  fetch(`/api/v1/workspaces/${workspaceSlug}/boards/${boardSlug}/tickets/`).then(res => res.json())

const getApiParameters = ({ workspaceSlug, boardSlug }) => getPk => {
  let method = 'post'
  let path = ['', 'api', 'v1', 'workspaces', workspaceSlug, 'boards', boardSlug, 'tickets']
  const pk = getPk()
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

const defaultMutationFn = ({ workspaceSlug, boardSlug }) => data => {
  const { path, method } = getApiParameters({ workspaceSlug, boardSlug })(() => data.id)
  return api[method](path, data).then(({ data }) => data)
}

const deleteFn = ({ workspaceSlug, boardSlug }) => pk => {
  return api.delete(`/api/v1/workspaces/${workspaceSlug}/boards/${boardSlug}/tickets/${pk}/`).then(({ data }) => ({}))
}

export const useTickets = useMyQuery('tickets', defaultQueryFn)
export const mutateTicket = useMyMutation('tickets', defaultMutationFn)
export const deleteTicket = useMyMutation('tickets', deleteFn)
