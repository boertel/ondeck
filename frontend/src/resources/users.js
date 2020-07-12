import useSWR from 'swr'


export const useUsers = ({ workspaceSlug, userId }) => {
  let key = `/workspaces/${workspaceSlug}/users/`
  if (userId) {
    key += `${userId}/`
  }
  return useSWR(key)
}

