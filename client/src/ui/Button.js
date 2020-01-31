import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

const Button = ({ to, ...props }) => {
  if (to) {
    return <Link to={to} {...props} />
  } else {
    return <button {...props} />
  }
}

export default styled(Button)`
  font-size: 14px;
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: ${({ theme }) => theme.radius};
  color: ${({ theme }) => theme.background};
  padding: 4px 8px;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.25); // makeshift border

  &:focus,
  &.focused {
    outline: 0;
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.25), 0 0 0 .1875rem ${({ theme }) => theme.hoverBackground};
  }
`
