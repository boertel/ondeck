import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { useTicketVersions } from '../../resources'

const CHANGES = [
  ['board_id', ({ board_id }) => `moved ticket to board ${board_id.new}`],
  ['column_id', ({ column_id }) => `moved ticket to column ${column_id.new}`],
]

function and(strings) {
  return strings.reduce((prev, curr, index) => {
    if (index === 0) {
      return curr
    } else if (index === strings.length - 1) {
      return `${prev} and ${curr}`
    } else {
      return `${prev}, ${curr}`
    }
  }, '')
}

const sentence = (by, changes) => {
  const limit = CHANGES.length
  let index = 0
  let found = null
  while (index < limit || found) {
    const change = CHANGES[index]
    if (Object.keys(changes).includes(change[0])) {
      found = change[1](changes)
      break
    }
    index += 1
  }

  return `${by.name} ${found || `updated ${and(Object.keys(changes))}`}.`
}

const Version = ({ at, by, changes }) => {
  const { search, ...rest } = changes
  return (
    <div>
      <div>{sentence(by, rest)}</div>
      <small>{moment(at).format('LLLL')}</small>
    </div>
  )
}

const Versions = ({ ticket }) => {
  const hasChanges = !moment(ticket.created_at).isSame(ticket.updated_at, 'seconds')
  const { workspaceSlug, boardSlug, ticketSlug } = useParams()
  const { data: versions = [] } = useTicketVersions(hasChanges ? { workspaceSlug, boardSlug, ticketSlug } : null)

  return (
    <>
      <h4 style={{ padding: '28px 0 10px 0' }}>Versions</h4>
      {versions.length === 0 && <em>No versions</em>}
      {versions.map((version) => {
        return <Version key={version.id} {...version} />
      })}
    </>
  )
}

export default Versions
