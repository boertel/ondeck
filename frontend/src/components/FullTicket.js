import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'

import { useTickets } from '../resources'
import { View } from '../ui'
import { TicketForm } from '../form'
import Versions from './Ticket/Versions'
import Comments from './Ticket/Comments'

const FullTicket = ({ className }) => {
  const { workspaceSlug, boardSlug, ticketSlug } = useParams()
  const { data: ticket, isLoading } = useTickets({ workspaceSlug, boardSlug, ticketSlug })

  const navigate = useNavigate()
  useEffect(() => {
    const onEscape = (evt) => {
      if (evt.key === 'Escape') {
        navigate(-1)
      }
    }
    window.addEventListener('keydown', onEscape)
    return () => {
      window.removeEventListener('keydown', onEscape)
    }
  }, [navigate])

  if (!ticket || isLoading) {
    return null
  }

  return (
    <View className={className}>
      <TicketForm {...ticket} onSubmit={() => navigate(-1)} />
      <Versions ticket={ticket} />
      <Comments />
    </View>
  )
}

export default styled(FullTicket)`
  background-color: var(--fg);
  flex-direction: column;
  padding: 10px;
  height: 100%;
  min-width: 400px;
  max-width: 800px;
`
