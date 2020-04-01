import React from 'react'
import { BrowserRouter as Router, Route, Routes, Redirect, } from 'react-router-dom'

import { ModalProvider } from './hooks/useModal'
import Workspace, { Workspaces } from './components/Workspace'


export default () => {
  return (
    <Router>
      <ModalProvider>
        <Routes>
          <Redirect from="/" to="/workspaces" />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/workspaces/:workspaceSlug/*" element={<Workspace />} />
        </Routes>
        <footer></footer>
      </ModalProvider>
    </Router>
  )
}
