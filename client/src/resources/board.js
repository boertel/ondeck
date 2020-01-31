import { useMyQuery } from './utils'


const defaultQueryFn = ({ workspaceSlug, boardSlug, }) => fetch(`/api/v1/workspaces/${workspaceSlug}/${boardSlug}/`).then(res => res.json())

export const useBoard = useMyQuery('board', defaultQueryFn)
