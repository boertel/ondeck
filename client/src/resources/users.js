import { useQuery } from 'react-query'

import api from './api'

const getPath = ({ workspaceSlug,}) => {
  let method = 'post'
  let path = ['', 'users']
  if (workspaceSlug) {
    path = path.concat([workspaceSlug])
  }
  path.push('')
  return {
    path: path.join('/'),
    method,
  }
}

const get = async (key, params={}) => {
  const { path } = getPath(params)
  const { data } = await api.get(path)
  return data
}

export const useUsers = (params) => {
  const queryKey = ['users', params].filter(v => v !== undefined)
  return useQuery(queryKey, get)
}

