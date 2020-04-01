import { useQuery } from 'react-query'

import api from './api'

const getPath = (userId) => {
  let method = 'post'
  let path = ['', 'users']
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

export const useUsers = (userId) => {
  const queryKey = ['users', userId].filter(v => v !== undefined)
  return useQuery(queryKey, get, { retry: 0 })
}

