/* eslint-disable react-hooks/rules-of-hooks */
import useSWR, { mutate } from 'swr'
import { update, remove } from './api'


export const useColumns = ({ workspaceSlug, boardSlug }) => {
  return useSWR(`/workspaces/${workspaceSlug}/boards/${boardSlug}/columns/`)
}

export const mutateColumn = ({ workspaceSlug, boardSlug }, data) => {
  const columnsKey = `/workspaces/${workspaceSlug}/boards/${boardSlug}/columns/`
  let path = columnsKey
  if (data.id) {
    path = `${path}${data.id}/`
  }
  return mutate(
    columnsKey,
    async columns => {
      const [column, created] = await update(path, data)
      if (created) {
        return [...columns, column]
      } else {
        return columns.map(previous => (previous.id === column.id ? column : previous))
      }
    },
    false
  )
}

export const deleteColumn = ({ workspaceSlug, boardSlug, columnId, }) => {
  const columnsKey = `/workspaces/${workspaceSlug}/boards/${boardSlug}/columns/`
  const columnKey = `${columnsKey}${columnId}/`
  mutate(columnsKey, columns => columns.filter(({ id }) => id !== columnId), false)
  return mutate(columnKey, remove(columnKey))
}
