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

export const mutateBoard = async ({ workspaceSlug }, data) => {
  const key = `/workspaces/${workspaceSlug}/boards/`
  const [board, created] = await update(key, data)
  await mutate(key, async boards => {
    if (created) {
      return [...boards, board]
    }
  }, false)
  return board
}

export const deleteBoard = ({ workspaceSlug, boardSlug }) => {
  const boardsKey = `/worksaces/${workspaceSlug}/boards/`
  const boardKey = `${boardsKey}${boardSlug}/`
  mutate(boardsKey, boards => boards.filter(({ slug }) => slug !== boardSlug), false)
  return mutate(boardKey, remove(boardKey))
}
