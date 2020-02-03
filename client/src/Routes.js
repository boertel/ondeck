import React from 'react'
import { groupBy } from 'lodash'
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch, useParams } from 'react-router-dom'

import { Sidebar, Loading, Columns, Column, ColumnTitle, Input, Button } from './ui'
import SidebarMenu, { SidebarMenuItem } from './ui/SidebarMenu'
import { FullTicket, Ticket, Tickets } from './components'
import Board from './components/Board'
import { useWorkspace, useBoard, useColumns, useTickets } from './resources'
import { BoardIcon, SearchIcon, AddIcon } from './ui/icons'
import { AddColumnForm } from './form'

function FullBoard() {
  const { path, url } = useRouteMatch()
  const { workspaceSlug, boardSlug } = useParams()
  const { columns, isLoadingColumns } = useColumns(['columns', { workspaceSlug, boardSlug }])
  const { tickets, isLoadingTickets } = useTickets(['tickets', { workspaceSlug, boardSlug }])

  let ticketsGroupByColumns = {}
  if (tickets) {
    ticketsGroupByColumns = groupBy(tickets, 'column')
  }

  // TODO why so many console.log/render?
  console.log(columns)

  return (
    <Switch>
      <Route exact path={path}>
        <Columns>
          {columns &&
            columns.map(({ id, name }) => (
              <Column key={id} id={id}>
                <ColumnTitle>
                  <div>{name}</div>
                  <Link to={{ pathname: `${url}/new`, search: `?column=${id}` }}>
                    <AddIcon />
                  </Link>
                </ColumnTitle>
                <Tickets>
                  {(ticketsGroupByColumns[id] || []).map(ticket => (
                    <Ticket key={ticket.key} to={`${url}/${ticket.key}`} {...ticket} />
                  ))}
                </Tickets>
              </Column>
            ))}
          <Column>
            <AddColumnForm />
          </Column>
        </Columns>
      </Route>
      <Route exact path={`${path}/new`}>
        <FullTicket />
      </Route>
      <Route path={`${path}/:ticketSlug`}>
        <FullTicket />
      </Route>
    </Switch>
  )
}

function Workspace() {
  const { path, url } = useRouteMatch()
  const { workspaceSlug } = useParams()

  const { workspace, isLoading } = useWorkspace(['workspace', { workspaceSlug }])

  const boards = (workspace || {}).boards

  return (
    <>
      <Sidebar>
        <Input type="search" className="no-border" placeholder="Search..." icon={SearchIcon} />
        {boards && (
          <SidebarMenu>
            <SidebarMenuItem>
              <h5>Boards</h5>
            </SidebarMenuItem>
            {boards.map(({ name, slug }) => (
              <Board as={SidebarMenuItem} key={slug} to={`${url}/${slug}`}>
                <BoardIcon />
                {name}
              </Board>
            ))}
          </SidebarMenu>
        )}
      </Sidebar>
      <main>
        <Switch>
          <Route exact path={path}>
            Index
          </Route>
          <Route path={`${path}/:boardSlug`}>
            <FullBoard />
          </Route>
        </Switch>
      </main>
    </>
  )
}

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/workspaces/:workspaceSlug">
          <Workspace />
        </Route>
      </Switch>
      <footer></footer>
    </Router>
  )
}

export default Routes
