import React from 'react'
import { BrowserRouter as Router, Route, Switch, useRouteMatch, useParams } from 'react-router-dom'

import { ModalProvider } from './hooks/useModal'
import { useModal } from './hooks/useModal'
import { Sidebar, Input } from './ui'
import SidebarMenu, { SidebarMenuItem } from './ui/SidebarMenu'
import { FullTicket } from './components'
import Board, { BoardMenuItem } from './components/Board'
import { useBoards } from './resources'
import { BoardIcon, SearchIcon, ActionsIcon } from './ui/icons'
import { AddBoardForm } from './form'
import CommandKModal from './modals/CommandKModal'

function FullBoard() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path}>
        <Board />
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

  //const { workspace } = useWorkspace()
  const { boards } = useBoards()

  const [openModal] = useModal(CommandKModal)

  return (
    <>
      <Sidebar>
        <SidebarMenu>
          <SidebarMenuItem>
            <Input type="search" className="no-border" placeholder="Search..." icon={SearchIcon} onClick={openModal} />
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem to={{ pathname: `/workspaces/${workspaceSlug}/actions` }}>
            <ActionsIcon />
            Actions
          </SidebarMenuItem>
        </SidebarMenu>
        {boards && (
          <SidebarMenu>
            <SidebarMenuItem>
              <h5>Boards</h5>
            </SidebarMenuItem>
            {boards.map(({ name, slug, id }) => (
              <BoardMenuItem as={SidebarMenuItem} boardId={id} boardSlug={slug} key={slug} to={`${url}/${slug}`}>
                <BoardIcon />
                {name}
              </BoardMenuItem>
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
      <ModalProvider>
        <Switch>
          <Route path="/workspaces/:workspaceSlug">
            <Workspace />
          </Route>
        </Switch>
        <footer></footer>
      </ModalProvider>
    </Router>
  )
}

export default Routes
