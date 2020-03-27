import { useMyMutation } from './utils'
import { useQuery } from 'react-query'

import api from './api'

const getApiParameters = ({ workspaceSlug, }) => pk => {
  let method = 'post'
  let path = ['', 'workspaces', workspaceSlug, 'boards']
  if (pk) {
    path.push(pk)
    method = method || 'patch'
  }
  path.push('')
  return {
    path: path.join('/'),
    method,
  }
}


const getBoards = async (key, { workspaceSlug }) => {
  const { data } = await api.get(`/workspaces/${workspaceSlug}/boards/`)
  return data
}

export const useBoards = (params) => {
  return useQuery(['boards', params], getBoards)
}

const defaultMutationFn = ({ workspaceSlug, boardSlug }) => data => {
  const { path, method } = getApiParameters({ workspaceSlug })(boardSlug)
  return api[method](path, data).then(({ data }) => data)
}

const deleteFn = ({ workspaceSlug, boardSlug }) => () => {
  const { path, } = getApiParameters({ workspaceSlug })(boardSlug)
  return api.delete(path).then(() => {})
}

export const mutateBoard = useMyMutation('boards', defaultMutationFn)
export const deleteBoard = useMyMutation('boards', deleteFn)
