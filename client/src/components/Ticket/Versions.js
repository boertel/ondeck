import React from 'react';
import moment from 'moment';

import { useTicketVersions } from '../../resources'

const Version = ({ at, by, changes }) => {
  return (
    <div>
      <div>{by.name} updated {Object.keys(changes).join(', ')}</div>
      <small>{moment(at).format('LLLL')}</small>
    </div>
  )
}

const Versions = ({ ticket }) => {
  const { versions } = useTicketVersions(ticket.id ? ['versions', {ticketId: ticket.id,}] : false)

  return (
    <>
      {(versions || []).map(version => {
        return <Version key={version.id} {...version} />
      })}
    </>
  )
}

export default Versions
