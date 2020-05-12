import React, { useState, useContext, createContext } from 'react'
import Modal from 'react-modal'

const styles = {
  overlay: {
    backgroundColor: 'var(--overlay)',
  },
  content: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    maxWidth: '800px',
    margin: '0 auto',
  }
}

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
      <Modal isOpen={modal.isOpen} onRequestClose={closeModal} style={styles}>
        {!!WrappedComponent && <WrappedComponent closeModal={closeModal} />}
      </Modal>
    </ModalContext.Provider>
  )
}

const useModal = (WrappedComponent, options) => {
  const { openModal, closeModal } = useContext(ModalContext)
  const open = openModal(WrappedComponent, options)

  return [open, closeModal]
}

export default useModal
