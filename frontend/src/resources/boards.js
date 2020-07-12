/* eslint-disable react-hooks/rules-of-hooks */
import useSWR, { mutate } from 'swr'
import { update, remove } from './api'

export const useBoards = ({ workspaceSlug, boardSlug }) => {
  let key = `/workspaces/${workspaceSlug}/boards/`
  if (boardSlug) {
    key = `${key}${boardSlug}/`
  }
  return useSWR(key)
}

export const mutateBoard = ({ workspaceSlug }, data) => {
  const key = `/workspaces/${workspaceSlug}/boards/`
  return mutate(
    key,
    async boards => {
      const [board, created] = await update(key, data)
      if (created) {
        return [...boards, board]
      }
    },
    false
  )
}

export const deleteBoard = ({ workspaceSlug, boardSlug }) => {
  const boardsKey = `/worksaces/${workspaceSlug}/boards/`
  const boardKey = `${boardsKey}${boardSlug}/`
  mutate(boardsKey, boards => boards.filter(({ slug }) => slug !== boardSlug), false)
  return mutate(boardKey, remove(boardKey))
}
