import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import cn from 'classnames'
import { isEqual } from 'lodash'
import { useNavigate, Routes, Route, useParams } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'

import { Sidebar, Input, View } from '../../ui'
import SidebarMenu, { SidebarMenuItem } from '../../ui/SidebarMenu'
import { BoardIcon, SearchIcon, ActionsIcon, AttachmentIcon, CloseIcon } from '../../ui/icons'
import { FullTicket } from '../'
import Board, { BoardMenuItem } from '../Board'
import { AddBoardForm } from '../../form'
import Command from '../../components/Command'

import Actions from '../Actions'
import Links from '../Links'

import { useBoards, mutateTicket } from '../../resources'

function Workspace({ className }) {
  const { workspaceSlug } = useParams()

  const { data: boards } = useBoards({ workspaceSlug })

  const navigate = useNavigate()

  const options = (boards || []).map((board, index) => ({
    name: board.name,
    subtitle: 'board',
    shortcut: `b ${index + 1}`,
    callback: () => {
      navigate(`/workspaces/${workspaceSlug}/${board.slug}/`)
      return { isOpen: false, query: '', activeIndex: 0, focused: null }
    },
  }))

  const onDragEnd = useCallback(
    function ({ draggableId, type, source, destination }) {
      console.log({ draggableId, type, source, destination })
      if (type === 'TICKET' && !isEqual(source, destination)) {
        const { boardSlug, ...rest } = JSON.parse(destination.droppableId)
        const data = {
          ...rest,
          position: destination.index,
        }
        mutateTicket({ workspaceSlug, boardSlug, ticketSlug: draggableId }, data)
      }
    },
    [workspaceSlug]
  )

  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={className}>
        <Sidebar className={cn({ show: showSidebar })}>
          <View flexDirection="column">
            <SidebarMenu>
              <SidebarMenuItem>
                <View alignItems="center">
                  {options.length > 0 && (
                    <Command placeholder="Search for a board or ticket...">
                      {({ dispatch }) => (
                        <Input
                          type="search"
                          className="transparent full-width"
                          placeholder="Search..."
                          onClick={() => dispatch({ type: 'open' })}
                          icon={SearchIcon}
                          style={{ marginBottom: 0 }}
                        />
                      )}
                    </Command>
                  )}
                  <CloseButton onClick={() => setShowSidebar(false)} />
                </View>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem to={`/workspaces/${workspaceSlug}/actions`}>
                <ActionsIcon />
                Actions
              </SidebarMenuItem>
              <SidebarMenuItem to={`/workspaces/${workspaceSlug}/links`}>
                <AttachmentIcon />
                Attachments
              </SidebarMenuItem>
            </SidebarMenu>
            {boards && (
              <SidebarMenu>
                <SidebarMenuItem>
                  <h5>Boards</h5>
                </SidebarMenuItem>
                {boards.map(({ name, slug, id }) => (
                  <BoardMenuItem as={SidebarMenuItem} boardId={id} boardSlug={slug} key={slug} to={`${slug}/`}>
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
        </Sidebar>
        <main>
          <Routes>
            <Route path="actions" element={<Actions />} />
            <Route path="links" element={<Links />} />
            <Route path=":boardSlug/:ticketSlug" element={<FullTicket />} />
            <Route path=":boardSlug/new" element={<FullTicket />} />
            <Route path=":boardSlug/" element={<Board openSidebar={() => setShowSidebar(true)} />} />
          </Routes>
        </main>
      </div>
    </DragDropContext>
  )
}

const CloseButton = styled((props) => {
  return <CloseIcon {...props} />
})`
  margin-left: 12px;
  display: none;
  @media (max-width: ${({ theme: { devices } }) => devices.small}) {
    display: block;
  }
`

export default styled(Workspace)`
  display: grid;
  grid-template-areas: 'nav content';
  grid-template-columns: 260px 1fr;
  @media (max-width: ${({ theme: { devices } }) => devices.small}) {
    grid-template-columns: 0px 1fr;
  }
  height: 100vh;

  header {
    grid-area: header;
  }

  nav {
    grid-area: nav;
  }

  main {
    grid-area: content;
    margin: 0 28px 28px 28px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  footer {
    grid-area: footer;
  }
`
