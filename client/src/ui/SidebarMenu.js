import React from 'react'
import styled from 'styled-components/macro'
import { NavLink } from 'react-router-dom'

//const SidebarMenuItem = ({ to, className, ...rest }) => {
const SidebarMenuItem = React.forwardRef(({ to, className, ...rest }, ref) => {
  const children = to ? (
    <NavLink to={to} activeClassName="active">
      {rest.children}
    </NavLink>
  ) : (
    rest.children
  )
  return <li className={className} ref={ref}>{children}</li>
})

const StyledSidebarMenuItem = styled(SidebarMenuItem)`
  h5 {
    display: flex;
    align-items: center;
    padding: 6px 10px;
    margin: 0 0 4px 0;
  }

  & > * {
    display: flex;
    align-items: center;
    padding: 6px 8px;
    margin: 6px 0;
    border-radius: ${({ theme }) => theme.radius};
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    border-style: dashed;
    border-color: transparent;
    border-width: 1px;

    svg {
      margin-right: 4px;
    }
  }

  & > a {
    &:hover,
    &:focus {
      background-color: ${({ theme }) => theme.hoverBackground};
      text-decoration: none;
    }
  }

  & > a {
    &.active {
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.background};
    }
  }

  &.canDrop a {
    border-color: ${({ theme }) => theme.primary};
  }

  &.isHover a {
    background-color: ${({ theme }) => theme.hoverBackground};
  }
`

export { StyledSidebarMenuItem as SidebarMenuItem }

export default styled.ul`
  padding: 0;
  margin: 0;
  margin-top: 8px;
  width: 100%;
`
