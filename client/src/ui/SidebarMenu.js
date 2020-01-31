import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'

const SidebarMenuItem = ({ to, className, ...rest }) => {
  const children = to ? <NavLink to={to} activeClassName="active">{rest.children}</NavLink> : rest.children;
  return <li className={className}>{children}</li>
}

const StyledSidebarMenuItem = styled(SidebarMenuItem)`
  h5 {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    margin: 0 0 4px 0;
  }

  a {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    margin: 6px 0;
    border-radius: ${({ theme }) => theme.radius};
    transition: all .2s ease-in-out;
    text-decoration: none;

    svg {
      margin-right: 4px;
    }

    &:hover, &:focus {
      background-color: ${({ theme }) => theme.hoverBackground};
      text-decoration: none;
    }

    &.active {
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.background};
    }
  }
`

export {
  StyledSidebarMenuItem as SidebarMenuItem,
}

export default styled.ul`
  padding: 0;
  margin: 0;
  margin-top: 8px;
  width: 100%;
`
