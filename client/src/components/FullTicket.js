import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useHistory, useParams } from 'react-router-dom'

import { useTickets } from '../resources'
import { View } from '../ui'
import { TicketForm } from '../form'
import Versions from './Ticket/Versions'

const FullTicket = ({ className }) => {
  const { ticketSlug } = useParams()
  // TODO should we fetch only `ticketSlug` here?
  const { tickets, isLoading } = useTickets()

  const history = useHistory()
  useEffect(() => {
    const onEscape = evt => {
      if (evt.key === 'Escape') {
        history.goBack()
      }
    }
    window.addEventListener('keydown', onEscape)
    return () => {
      window.removeEventListener('keydown', onEscape)
    }
  }, [history])

  if (!tickets || isLoading) {
    return null
  }

  const ticket = tickets.find(({ key }) => key === ticketSlug) || {}

  return (
    <View className={className}>
      <TicketForm {...ticket} onSubmit={() => history.goBack()} />
      <Versions ticket={ticket} />
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
