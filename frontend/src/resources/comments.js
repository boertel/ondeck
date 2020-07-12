/* eslint-disable react-hooks/rules-of-hooks */
import useSWR, { mutate } from 'swr'
import { update } from './api'


export const useComments = (params) => {
  let key = null
  if (params) {
    const { workspaceSlug, boardSlug, ticketSlug } = params
    key = `/workspaces/${workspaceSlug}/boards/${boardSlug}/tickets/${ticketSlug}/comments/`
  }
  return useSWR(key)
}

export const mutateComment = ({ workspaceSlug, boardSlug, ticketSlug }, data) => {
  const commentsKey = `/workspaces/${workspaceSlug}/boards/${boardSlug}/tickets/${ticketSlug}/comments/`
  mutate(commentsKey, async comments => {
    const [comment, created ] = await update(commentsKey, data)
    if (created) {
      return [comment, ...comments]
    } else {
      return comments.map(previous => previous.id === comment.id ? comment : previous)
    }
  })
}
