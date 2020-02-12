import React from 'react'
import Modal from 'react-modal'

import CommandK from '../components/CommandK'

function CommandKModal({ closeModal, }) {
  return (
    <>
      <CommandK />
      <button onClick={closeModal}>Close</button>
    </>
  )
}

export default CommandKModal
