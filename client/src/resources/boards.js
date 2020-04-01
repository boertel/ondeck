/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, queryCache } from 'react-query'

import api from './api'

const getPath = ({ workspaceSlug, boardSlug, }) => {
  let method = 'post'
  let path = ['', 'workspaces', workspaceSlug, 'boards']
  if (boardSlug) {
    path.push(boardSlug)
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

const createOrUpdate = async (params, variables) => {
  const { path, method } = getPath(params)
  const { data } = await api[method](path, variables)
  return data
}

const _delete = async (params) => {
  const { path } = getPath(params)
  await api.delete(path)
  return {}
}

export const useBoards = (params) => {
  return useQuery(['boards', params], get)
}

export const mutateBoard = (params) => {
  const mutateFn = async data => await createOrUpdate(params, data)
  return useMutation(mutateFn, {
    onSuccess: () => {
      queryCache.refetchQueries(['boards', params])
    }
  })
}

export const deleteBoard = (params) => {
  const mutateFn = async data => _delete(params)
  return useMutation(mutateFn, {
    onSuccess: () => {
      queryCache.removeQueries(['boards', params], { exact: true })
      queryCache.refetchQueries(['boards', { workspaceSlug: params.workspaceSlug }])
    }
  })
}

