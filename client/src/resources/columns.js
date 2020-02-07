import { useMyMutation, useMyQuery } from './utils'
import api from './api'

const defaultQueryFn = ({ workspaceSlug, boardSlug }) =>
  api(`/api/v1/workspaces/${workspaceSlug}/boards/${boardSlug}/columns/`).then(({ data }) => data)

const defaultMutationFn = ({ workspaceSlug, boardSlug }) => data =>
  api.post(`/api/v1/workspaces/${workspaceSlug}/boards/${boardSlug}/columns/`, data).then(({ data }) => data)

const deleteFn = ({ workspaceSlug, boardSlug }) => pk =>
  api.delete(`/api/v1/workspaces/${workspaceSlug}/boards/${boardSlug}/columns/${pk}`).then(() => ({}))

export const useColumns = useMyQuery('columns', defaultQueryFn)
export const mutateColumn = useMyMutation('columns', defaultMutationFn)
export const deleteColumn = useMyMutation('columns', deleteFn)
