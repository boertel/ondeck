import { useMyQuery } from './utils'

const defaultQueryFn = ({ workspaceSlug }) => fetch(`/api/v1/workspaces/${workspaceSlug}/`).then(res => res.json())

export const useWorkspace = useMyQuery('workspace', defaultQueryFn)
