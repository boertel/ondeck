/* eslint-disable react-hooks/rules-of-hooks */
import { sortBy } from 'lodash'
import useSWR, { mutate } from 'swr'
import { update, remove } from './api'


export const useTickets = ({ workspaceSlug, boardSlug, ticketSlug }) => {
  let key = `/workspaces/${workspaceSlug}/boards/${boardSlug}/tickets/`
  if (ticketSlug) {
    key += `${ticketSlug}/`
  }
  return useSWR(key)
}

export const useTicketVersions = (params) => {
  let key = null
  if (params !== null) {
    const { workspaceSlug, boardSlug, ticketSlug } = params
    key = `/workspaces/${workspaceSlug}/boards/${boardSlug}/tickets/${ticketSlug}/versions/`
  }
  return useSWR(key, { initialData: [] })
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export const mutateTicket = async ({ workspaceSlug, boardSlug, ticketSlug }, data) => {
  let ticketsKey = `/workspaces/${workspaceSlug}/boards/${boardSlug}/tickets/`
  let path = ticketsKey
  if (ticketSlug) {
    path = `${path}${ticketSlug}/`
  }

  // Local mutate for drag and drop
  await mutate(ticketsKey, tickets => {
    const oldTicket = tickets.find(({ pk }) => pk === ticketSlug)
    if (data.position !== undefined || data.column !== undefined) {
      // ticket has moved
      let newOrder = []
      const ticketsInColumn = sortBy(tickets.filter(previous => previous.column === (data.column === undefined ? oldTicket.column : data.column)), 'position')
      if (data.column !== oldTicket.column) {
        newOrder = ticketsInColumn.splice(data.position, 0, {...oldTicket, column: data.column, position: data.position, })
      } else if (data.position !== oldTicket.position) {
        newOrder = reorder(ticketsInColumn, oldTicket.position, data.position)
      }

      const output = tickets.map(previous => {
        const index = newOrder.indexOf(previous)
        if (index !== -1) {
          return {
            ...previous,
            position: index,
          }
        } else {
          return previous
        }
      })
      return output
    } else {
      return tickets
    }
  }, false)

  await mutate(ticketsKey, async tickets => {
    const [ticket, created] = await update(path, data, { method: ticketSlug ? 'patch' : 'post' })
    if (created) {
      return [...tickets, ticket]
    } else {
      return tickets.map(previous => {
        if (previous.id === ticket.id) {
          return ticket
        } else {
          return previous
        }
      })
    }
  }, false)
}

export const deleteTicket = ({ workspaceSlug, boardSlug, ticketSlug, }) => {
  const ticketsKey = `/workspaces/${workspaceSlug}/boards/${boardSlug}/tickets/`
  const ticketKey = `${ticketsKey}${ticketSlug}/`
  mutate(ticketsKey, columns => columns.filter(({ pk }) => pk !== ticketSlug), false)
  return mutate(ticketKey, remove(ticketKey))
}
