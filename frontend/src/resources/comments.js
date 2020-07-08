/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, queryCache } from 'react-query'
import api from './api'


const getPath = ({ workspaceSlug, boardSlug, ticketSlug, commentId }) => {
  let method = 'post'
  let path = ['', 'workspaces', workspaceSlug]
  if (commentId) {
    method = 'patch'
    return {
      path: path.concat(['comments', commentId, '']).join('/'),
      method,
    }
  }
  path = path.concat(['boards', boardSlug, 'tickets', ticketSlug, 'comments', ''])
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

const createOrUpdate = async (params, variables) => {
  const { path, method } = getPath(params)
  const { data } = await api[method](path, variables)
  return data
}

export const useComments = params => {
  return useQuery(['comments', params], get, { enabled: params.ticketSlug })
}

export const mutateComment = params => {
  const mutateFn = async (data) => await createOrUpdate(params, data)
  return useMutation(mutateFn, {
    onSuccess: (data, variables) => {
      queryCache.invalidateQueries(['comments', params])
    }
  })
}
