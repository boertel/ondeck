import React from 'react'
import { transparentize } from 'polished';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components/macro';

import { View } from '../../ui'

const TicketTitle = styled.h4`
  font-size: 16px;
  font-weight: normal;
  padding: 0;
  margin: 0;
`

const Ticket = ({ title, className, to, }) => {
  const { url } = useRouteMatch()
  return (
    <View as={Link} className={className} to={to}>
      <TicketTitle>{title}</TicketTitle>
    </View>
  )
}

export default styled(Ticket)`
  background-color: ${({ theme }) => theme.foreground};
  width: 100%;
  justify-content: flex-start;
  border: 1px solid transparent;
  padding: 10px;
  margin-bottom: 8px;
  transition-property: border-color, color;
  transition-duration: .2s;
  transition-timing-function: ease-in-out;

  color: ${({ theme }) => theme.color};
  text-decoration: none;
  outline: none;

  &:hover, &:focus {
    border-color: ${({ theme }) => transparentize(0.2, theme.primary)};
    outline: none;
    text-decoration: none;
  }
  &:focus {
    box-shadow: inset 0 0 0 1px rgba(0,0,0, .25), 0 0 0 .1875rem ${({ theme }) => transparentize(.25, theme.primary)};
  }
`
