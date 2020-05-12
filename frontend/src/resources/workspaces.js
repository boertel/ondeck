import { useQuery } from 'react-query'

import api from './api'

const getPath = ({ workspaceSlug,}) => {
  let method = 'post'
  let path = ['', 'workspaces']
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

export const useWorkspaces = (params) => {
  const queryKey = ['workspaces', params].filter(v => v !== undefined)
  return useQuery(queryKey, get)
}
