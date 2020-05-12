import { useQuery } from 'react-query'

import api from './api'

const seconds = n => n * 1000
const minutes = n => seconds(n * 60)

const getPath = ({ workspaceSlug, userId }) => {
  let method = 'post'
  let path = ['', 'workspaces', workspaceSlug, 'users']
  if (userId) {
    path = path.concat([userId])
  }
  path.push('')
  return {
    path: path.join('/'),
    method,
  }
}

const get = async (key, userId) => {
  const { path } = getPath(userId)
  const { data } = await api.get(path)
  return data
}

export const useUsers = ({ workspaceSlug, userId }) => {
  const queryKey = ['users', { workspaceSlug, userId }].filter(v => v !== undefined)
  return useQuery(queryKey, get, { staleTime: minutes(5) })
}

