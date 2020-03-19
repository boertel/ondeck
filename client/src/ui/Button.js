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

Button.defaultProps = {
  type: 'button',
}

export default styled(Button)`
  margin: 0;
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  border-radius: ${({ theme }) => theme.radius};
  background-color: ${({ theme }) => theme.primary};
  border: 2px solid var(--gray-700);
  color: white;
  text-decoration: none;
  font-weight: bold;
  appearance: none;
  display: inline-block;
  line-height: initial;
  transition: background-color 200ms ease-in-out, border 200ms ease-in-out,
    transform 200ms ease-in-out;
  -webkit-touch-callout: none;
  user-select: none;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.hoverBackground};
  }

  &:focus-visible {
    border-color: var(--focus-ring-color);
    outline: none;
  }

  svg {
    display: block;
    width: 1em;
    height: 1em;
  }

  & + button {
    margin-left: 12px;
  }
`
