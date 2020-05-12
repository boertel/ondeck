import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { View } from '../../ui'
import SidebarMenu, { SidebarMenuItem } from '../../ui/SidebarMenu'
import { useUsers } from '../../resources/users'
import { Reference, Popper as ReactPopper } from 'react-popper'

/*
import { Reference, Popper } from 'react-popper'
       <Reference>
        {({ ref }) => (
          <button ref={ref} onClick={() => setVisible(!visible)} style={{width: '100%'}}>
            {user.name}
          </button>
        )}
      </Reference>
      {visible ? (
        <Popper>
          {({ ref, style, placement }) => (
            <div ref={ref} style={{...style, backgroundColor: 'var(--fg)'}} data-placement={placement}>
            </div>
          )}
        </Popper>
      ) : null}*/

const Menu = () => (
  <SidebarMenu>
    <SidebarMenuItem to="/settings">Settings</SidebarMenuItem>
    <SidebarMenuItem to="/logout">Logout</SidebarMenuItem>
  </SidebarMenu>
)

const useCloseManager = ({ isOpen, onClose, popupRef, triggerRef }) => {
  useEffect(() => {
    const onClick = ({ target }) => {
      const isClickOnPopup = popupRef && popupRef.contains(target)
      const isClickOnTrigger = triggerRef && triggerRef.contains(target)

      if (!isClickOnPopup && !isClickOnTrigger) {
        onClose()
      }
    }

    const onKeyDown = event => {
      const { key } = event
      if (key === 'Escape' || key === 'Esc') {
        onClose()
      }
    }

    if (isOpen && popupRef) {
      document.addEventListener('click', onClick, true)
      document.addEventListener('keydown', onKeyDown)
    }

    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose, popupRef])
}

const Popper = ({ as: AsComponent, popperElement: PopperElement, children }) => {
  const [popupRef, setPopupRef] = useState(null)
  const [triggerRef, setTriggerRef] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)
  const onClick = () => setIsOpen(!isOpen)

  useCloseManager({ popupRef, isOpen, onClose, triggerRef, })

  return (
    <>
      <Reference>
        {({ ref }) => (
          <AsComponent onClick={onClick} ref={node => {
            ref(node)
            setTriggerRef(node)
          }}>
            {children}
          </AsComponent>
        )}
      </Reference>
      {isOpen ? (
        <ReactPopper>
          {({ ref, style, placement }) => {
            return (
              <div
                ref={node => {
                  ref(node)
                  setPopupRef(node)
                }}
                style={style}
                data-placement={placement}
              >
                <PopperElement />
              </div>
            )
          }}
        </ReactPopper>
      ) : null}
    </>
  )
}

function UserMenu(props) {
  // TODO update to /auth and move menu at the top with workspace switcher
  return null
  /*
  const { workspaceSlug } = useParams()
  const { data: user, isLoading } = useUsers({ workspaceSlug, userId: 'me' })
  const [visible, setVisible] = useState(false)
  if (!user) {
    return null
  }

  return (
    <View {...props} radius="0">
      <Popper as="button" popperElement={Menu}>
        {user.name}
      </Popper>
    </View>
  )
  */
}

export default styled(UserMenu)`
  padding: 12px;
  border-top: 1px solid var(--border-color);
`
