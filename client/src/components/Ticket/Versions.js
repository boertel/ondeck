import React from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { useTicketVersions } from '../../resources'

const Version = ({ at, by, changes }) => {
  return (
    <div>
      <div>
        {by.name} updated {Object.keys(changes).join(', ')}
      </div>
      <small>{moment(at).format('LLLL')}</small>
    </div>
  )
}

const Versions = ({ ticket }) => {
  const hasChanges = !moment(ticket.created_at).isSame(ticket.updated_at, 'seconds')
  const params = useParams()
  const { data: versions } = useTicketVersions(hasChanges && params)
  // TODO initial data?

  return (
    <>
      {(versions || []).map(version => {
        return <Version key={version.id} {...version} />
      })}
    </>
  )
}

export default Versions
