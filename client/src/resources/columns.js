/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery, useMutation, queryCache, } from 'react-query'
import api from './api'

const getPath = ({ workspaceSlug, boardSlug, pk }) => {
  let method = 'post'
  let path = ['', 'workspaces', workspaceSlug, 'boards', boardSlug, 'columns']
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


const get = async (key, params) => {
  const { path } = getPath(params)
  const { data } = await api.get(path)
  return data
}

const createOrUpdate = async (params, variables) => {
  const pk = variables.id
  const { path, method } = getPath({ ...params, pk })
  const { data } = await api[method](path, variables)
  return data
}

const _delete = async (params, pk) => {
  const { path } = getPath({ ...params, pk })
  await api.delete(path)
}

export const useColumns = (params) => {
  return useQuery(['columns', params], get)
}


export const mutateColumn = (params) => {
  const mutateFn = async data => await createOrUpdate(params, data)
  return useMutation(mutateFn, {
    onSuccess: (data, variables) => {
      const key = ['columns', params]
      if (variables.id) {
        queryCache.setQueryData(key, old => {
          return old.map(column => {
            if (column.id === variables.id) {
              return data
            }
            return column
          })
        })
      } else {
        queryCache.setQueryData(key, old => {
          return old.concat([data])
        })
      }
    }
  })
}

export const deleteColumn = (params) => {
  const mutateFn = async pk => _delete(params, pk)
  return useMutation(mutateFn, {
    onSuccess: (data, pk) => {
      const key = ['columns', params]
      queryCache.setQueryData(key, old => {
        return old.filter(({ id }) => id !== pk)
      })
    }
  })
}
