import React from 'react'
import { groupBy } from 'lodash'
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch, useParams } from 'react-router-dom'

import { Sidebar, Columns, Column, ColumnTitle, Input, Button } from './ui'
import SidebarMenu, { SidebarMenuItem } from './ui/SidebarMenu'
import { FullTicket, Ticket, Tickets } from './components'
import Board from './components/Board'
import BoardHeader from './components/Board/BoardHeader'
import {deleteColumn } from './resources/columns'
import { useBoards, useColumns, useTickets } from './resources'
import { TrashIcon, BoardIcon, SearchIcon, AddIcon } from './ui/icons'
import { AddColumnForm, AddBoardForm } from './form'

function FullBoard() {
  const { path, url } = useRouteMatch()
  const { columns } = useColumns('columns')
  const { tickets } = useTickets('tickets')
  const { data: board, } = useBoards(['boards', useParams()])

  const [ removeColumn ] = deleteColumn()

  let ticketsGroupByColumns = {}
  if (tickets) {
    ticketsGroupByColumns = groupBy(tickets, 'column')
  }

  // TODO why so many console.log/render?
  //console.log(columns)

  return (
    <Switch>
      <Route exact path={path}>
        {board && <BoardHeader {...board} />}
        <Columns>
          {columns &&
            columns.map(({ id, name }) => (
              <Column key={id} id={id}>
                <ColumnTitle>
                  <div>{name}</div>
                  <Button onClick={() => removeColumn(id)}><TrashIcon /></Button>
                </ColumnTitle>
                <Tickets>
                  {(ticketsGroupByColumns[id] || []).map(ticket => (
                    <Ticket key={ticket.key} to={`${url}/${ticket.key}`} {...ticket} />
                  ))}
                </Tickets>
                <Link to={{ pathname: `${url}/new`, search: `?column=${id}` }}>
                  <AddIcon /> New Ticket
                </Link>
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

  //const { workspace } = useWorkspace()
  const { boards } = useBoards()

  return (
    <>
      <Sidebar>
        <SidebarMenu>
          <SidebarMenuItem>
            <Input type="search" className="no-border" placeholder="Search..." icon={SearchIcon} />
          </SidebarMenuItem>
        </SidebarMenu>
        {boards && (
          <SidebarMenu>
            <SidebarMenuItem>
              <h5>Boards</h5>
            </SidebarMenuItem>
            {boards.sort((a, b) => a.id - b.id).map(({ name, slug }) => (
              <Board as={SidebarMenuItem} key={slug} to={`${url}/${slug}`}>
                <BoardIcon />
                {name}
              </Board>
            ))}
            <SidebarMenuItem>
              <AddBoardForm />
            </SidebarMenuItem>
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
