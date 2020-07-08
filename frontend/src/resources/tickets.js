/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, queryCache } from 'react-query'
import api from './api'

const getPath = ({ workspaceSlug, boardSlug, ticketSlug }) => {
  let method = 'post'
  let path = ['', 'workspaces', workspaceSlug]
  if (boardSlug) {
    path = path.concat(['boards', boardSlug])
  }
  path.push('tickets')
  if (ticketSlug) {
    path.push(ticketSlug)
    method = 'patch'
  }
  path.push('')
  return {
    path: path.join('/'),
    method,
  }
}

const get = async (key, params) => {
  const { path } = getPath(params)
  const { data } = await api.get(path)
  return data
}

const getTicketVersions = async (key, params) => {
  const { path } = getPath(params)
  const { data } = await api.get(`${path}versions/`)
  return data
}

const createOrUpdate = async (params, variables) => {
  // TODO not clean
  const { path, method } = getPath({ ...params, ticketSlug: variables.pk || params.ticketSlug })
  const { data } = await api[method](path, variables)
  return data
}

const _delete = async params => {
  const { path } = getPath(params)
  await api.delete(path)
  return {}
}

export const useTickets = params => {
  return useQuery(['tickets', params], get)
}

export const useTicketVersions = params => {
  return useQuery(['versions', params], getTicketVersions, { enabled: params.ticketSlug })
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export const mutateTicket = params => {
  const mutateFn = async ({ fromBoardSlug, ...data }) => await createOrUpdate(params, data)
  return useMutation(mutateFn, {
    onSuccess: (data, variables) => {
      const query = {
        workspaceSlug: params.workspaceSlug,
        boardSlug: params.boardSlug || variables.fromBoardSlug,
        ticketSlug: params.ticketSlug,
      }
      const { pk, position, column } = variables
      if (position !== undefined) {
        queryCache.setQueryData(['tickets', query], function (previous) {
          const old = previous.find(ticket => pk === ticket.pk)
          if (position !== undefined) {
            const ticketsInColumn = previous.filter(ticket => ticket.column === column)
            if (column === old.column) {
              return reorder(ticketsInColumn, old.position, position).map((ticket, index) => ({
                ...ticket,
                position: index,
              }))
            } else {
              return ticketsInColumn.splice(position, 0, {...old, position, })
            }
          }
          return previous
        })
      }
      queryCache.invalidateQueries(['tickets', query])
    },
  })
}

export const deleteTicket = params => {
  const mutateFn = async data => await _delete(params)
  return useMutation(mutateFn, {
    onSuccess: () => {
      queryCache.removeQueries(['tickets', params], { exact: true })
    },
  })
}
