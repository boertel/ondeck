/* eslint-disable react-hooks/rules-of-hooks */
import { useMyMutation } from './utils'
import { useQuery, useMutation } from 'react-query'
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

const getTicketPath = ({ workspaceSlug, boardSlug, ticketSlug }) => {
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

const getTickets = async (key, params) => {
  const { path } = getTicketPath(params)
  const { data } = await api.get(path)
  return data
}

const getTicketVersions = async (key, params) => {
  const { path } = getTicketPath(params)
  const { data } = await api.get(`${path}versions/`)
  return data
}

const createOrUpdateTicket = async (params, variables) => {
  const { path, method, } = getTicketPath(params)
  const { data } = await api[method](path, variables)
  return data
}

const _deleteTicket = async (params) => {
  const { path, } = getTicketPath(params)
  await api.delete(path)
  return {}
}


export const useTickets = (params) => {
  return useQuery(['tickets', params], getTickets)
}

export const useTicketVersions = (params) => {
  return useQuery(params.ticketSlug && ['versions', params], getTicketVersions)
}

export const mutateTicket = (params) => {
  const mutateFn = async data => await createOrUpdateTicket(params, data)
  return useMutation(mutateFn)
}

export const deleteTicket = (params) => {
  const mutateFn = async data => await _deleteTicket(params)
  return useMutation(mutateFn)
}
