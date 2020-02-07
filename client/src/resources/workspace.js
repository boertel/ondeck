import { useMyQuery } from './utils'
import api from './api'

const defaultQueryFn = ({ workspaceSlug }) => api.get(`/api/v1/workspaces/${workspaceSlug}/`).then(({ data }) => data)

export const useWorkspace = useMyQuery('workspace', defaultQueryFn)
