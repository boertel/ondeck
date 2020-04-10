import React from 'react'
import { useParams } from 'react-router-dom'

import { useTicketResources } from '../../resources/tickets'


const Resource = ({ type, value, updated_at }) => {
  switch(type) {
    case 'link':
      return <a href={value} target="_blank" rel="noreferrer noopener">{value}</a>

    default:
      return <div>{value}</div>
  }
}

const Resources = () => {
  const { workspaceSlug, boardSlug, ticketSlug } = useParams()
  const { data: resources } = useTicketResources({ workspaceSlug, boardSlug, ticketSlug })
  // TODO initial data? to avoid (versions || []) later

  return (
    <>
      <h4>Resources</h4>
      {(resources || []).map(resource => {
        return <Resource key={resource.id} {...resource} />
      })}
    </>
  )
}

export default Resources
