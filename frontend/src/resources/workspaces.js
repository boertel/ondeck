import useSWR, { mutate } from 'swr'
import { update } from './api'

export const useWorkspaces = () => {
  return useSWR('/workspaces/')
}

export const mutateWorkspace = async ({ name }) => {
  const key = `/workspaces/`
  const data = {
    name,
  }
  const [workspace, created] = await update(key, data)
  await mutate(
    key,
    async (workspaces) => {
      if (created) {
        return [...workspaces, workspace]
      }
      return workspaces
    },
    false
  )
  return workspace
}
