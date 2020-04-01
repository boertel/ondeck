import React from 'react'
import { Route, Routes, Redirect, useNavigate, useLocation } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
import { ReactQueryConfigProvider } from 'react-query'

import Workspace, { Workspaces } from './components/Workspace'
import { Login } from './components/Auth'


export default () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryConfig = {
    refetchAllOnWindowFocus: false,
    onError: (error) => {
      if (error.response.status === 403) {
        navigate(`/login?next=${location.pathname}`)
      }
    }
  }
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Routes>
        <Redirect from="/" to="/workspaces" />
        <Route path="/login" element={<Login />} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/workspaces/:workspaceSlug/*" element={<Workspace />} />
      </Routes>
      <footer></footer>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryConfigProvider>
  )
}
