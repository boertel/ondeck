import React, { useState, useContext, createContext } from 'react'
import Modal from 'react-modal'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    WrappedComponent: null,
  })

  const openModal = WrappedComponent => () => setModal({ isOpen: true, WrappedComponent, })
  const closeModal = () => setModal({ isOpen: false })

  const value = { openModal, closeModal }

  const { WrappedComponent } = modal

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal isOpen={modal.isOpen} onRequestClose={closeModal}>
        {!!WrappedComponent && <WrappedComponent closeModal={closeModal} />}
      </Modal>
    </ModalContext.Provider>
  )
}

export const useModal = (WrappedComponent, options) => {
  const { openModal, closeModal } = useContext(ModalContext)
  const open = openModal(WrappedComponent, options)

  return [open, closeModal]
}
