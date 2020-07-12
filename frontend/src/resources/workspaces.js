import useSWR from 'swr'

export const useWorkspaces = () => {
  return useSWR('/workspaces/')
}
