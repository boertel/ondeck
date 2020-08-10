import React, { useCallback } from 'react'
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { SWRConfig } from 'swr'

import { fetcher } from './resources/api'
import Workspace, { Workspaces } from './components/Workspace'
import { Login } from './components/Auth'
import { BoardIcon } from './ui/icons'


export default () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onError = useCallback(function(error) {
    if (error.response?.status === 403) {
      navigate(`/login?next=${location.pathname}`)
    }
  }, [navigate, location.pathname])


  const swrConfig = {
    fetcher,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onError,
  }

  return (
    <SWRConfig value={swrConfig}>
      <Routes>
        <Navigate from="/" to="/workspaces" />
        <Route path="/login" element={<Login />} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/workspaces/:workspaceSlug/*" element={<Workspace />} />
      </Routes>
    </SWRConfig>
  )
}
