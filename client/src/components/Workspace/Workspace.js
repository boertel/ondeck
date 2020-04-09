import React from 'react'
import styled from 'styled-components'
import { Routes, Route, useParams } from 'react-router-dom'

import useModal from '../../hooks/useModal'
import { Sidebar, Input, View } from '../../ui'
import SidebarMenu, { SidebarMenuItem } from '../../ui/SidebarMenu'
import { BoardIcon, SearchIcon, ActionsIcon } from '../../ui/icons'
import { FullTicket } from '../'
import Board, { BoardMenuItem } from '../Board'
import CommandKModal from '../../modals/CommandKModal'
import { AddBoardForm } from '../../form'
import { useBoards } from '../../resources'
import Workspaces from './Workspaces'
import UserMenu from '../User/UserMenu'

function Workspace({ className }) {
  const { workspaceSlug } = useParams()

  //const { workspace } = useWorkspaces()
  const { data: boards } = useBoards({ workspaceSlug })

  const [openModal] = useModal(CommandKModal)
  //useEffect(() => openModal(), [])

  return (
    <div className={className}>
      <Sidebar>
        <View flexDirection="column">
          <SidebarMenu>
            <SidebarMenuItem>
              <div>
                <Workspaces workspaceSlug={workspaceSlug} />
              </div>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Input
                type="search"
                className="transparent full-width"
                placeholder="Search..."
                icon={SearchIcon}
                onClick={openModal}
              />
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
                <BoardMenuItem as={SidebarMenuItem} boardId={id} boardSlug={slug} key={slug} to={`${slug}`}>
                  <BoardIcon />
                  {name}
                </BoardMenuItem>
              ))}
              <SidebarMenuItem>
                <AddBoardForm />
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </View>
        <UserMenu />
      </Sidebar>
      <main>
        <Routes>
          <Route path=":boardSlug" element={<Board />} />
          <Route path=":boardSlug/new" element={<FullTicket />} />
          <Route path=":boardSlug/:ticketSlug" element={<FullTicket />} />
        </Routes>
      </main>
    </div>
  )
}

export default styled(Workspace)`
  display: grid;
  grid-template-areas:
    'nav content'
    'footer footer';
  grid-template-columns: 260px 1fr;
  grid-template-rows: 1fr auto;
  height: 100vh;

  header {
    grid-area: header;
  }

  nav {
    grid-area: nav;
  }

  main {
    grid-area: content;
    margin: 10px;
    display: grid;
    grid-template-rows: min-content 1fr;
  }

  footer {
    grid-area: footer;
  }
`
