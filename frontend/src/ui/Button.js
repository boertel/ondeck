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
  display: inline-flex;
  padding: 0.65rem 0.5rem;
  margin: 0;
  font-size: 1rem;
  border-width: 2px;
  border-style: solid;
  border-color: var(--border-color);
  background-color: var(--bg);
  color: var(--default);
  border-radius: var(--border-radius);
  appearance: none;
  text-decoration: none;
  transition: background-color 200ms ease-in-out, border 200ms ease-in-out,
    transform 200ms ease-in-out;
  -webkit-touch-callout: none;
  user-select: none;
  line-height: 1rem;

  &:hover {
    cursor: pointer;
    text-decoration: none;
    background-color: var(--border-color);
  }

  &:focus-visible {
    border-color: var(--focus-ring-color);
    outline: none;
  }

  &.primary, &[type="submit"] {
    background-color: var(--primary);
    color: var(--fg);

    &:hover, &:focus {
    }
  }

  &.link {
    background-color: transparent;
    border-color: transparent;
    color: var(--primary);

    &:hover, &:focus {
      text-decoration: underline;
    }
  }

  &.outline {
    background-color: transparent;
    border-color: var(--primary);
    color: var(--primary);

    &:hover, &:focus {
      background-color: var(--primary);
      color: var(--fg);
    }
  }

  svg {
    display: block;
    width: 1rem;
    height: 1rem;
    &:first-child {
      margin-left: 4px;
    }
    &:last-child {
      margin-right: 4px;
    }
  }

  & + & {
    margin-left: 12px;
  }
`
