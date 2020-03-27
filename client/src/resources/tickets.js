import { useMyQuery, useMyMutation } from './utils'
import api from './api'


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

const defaultQueryFn = (key, { workspaceSlug, boardSlug }) => {
  const { path } = getApiParameters({ workspaceSlug, boardSlug })()
  return api.get(path).then(({ data }) => data)
}

export const defaultMutationFn = ({ workspaceSlug, boardSlug }) => data => {
  const { method, path } = getApiParameters({ workspaceSlug, boardSlug })(data.id)
  return api[method](path, data).then(({ data }) => data)
}

const deleteFn = ({ workspaceSlug, boardSlug }) => pk => {
  return api.delete(`/api/v1/workspaces/${workspaceSlug}/boards/${boardSlug}/tickets/${pk}/`).then(({ data }) => ({}))
}

export const useTickets = useMyQuery('tickets', defaultQueryFn)

export const useTicketVersions = useMyQuery('versions', (key, { workspaceSlug, boardSlug, ticketId, }) => {
  const { path } = getApiParameters({ workspaceSlug, boardSlug })(ticketId)
  return api.get(`${path}versions/`).then(({ data }) => data);
})

export const mutateTicket = useMyMutation('tickets', defaultMutationFn)
export const deleteTicket = useMyMutation('tickets', deleteFn, {
  onSuccess: (data, variables, queryCache) => {
    queryCache.removeQueries(['versions', variables])
  }
})
