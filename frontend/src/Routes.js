import React, { useCallback } from 'react'
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
import { ReactQueryConfigProvider } from 'react-query'

import Workspace, { Workspaces } from './components/Workspace'
import { Login } from './components/Auth'


export default () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onError = useCallback(function(error) {
    if (error.response.status === 403) {
      navigate(`/login?next=${location.pathname}`)
    }
  }, [navigate, location.pathname])

  const queryConfig = {
    queries: {
      refetchOnWindowFocus: false,
      onError,
    },
    mutations: {
      onError,
    }
  }
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Routes>
        <Navigate from="/" to="/workspaces" />
        <Route path="/login" element={<Login />} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/workspaces/:workspaceSlug/*" element={<Workspace />} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryConfigProvider>
  )
}
