import React, { useCallback } from 'react'
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { SWRConfig } from 'swr'

import { fetcher } from './resources/api'
import Workspace, { Workspaces } from './components/Workspace'
import { Login } from './components/Auth'
import { useCommand } from './components/Command'
import { BoardIcon } from './ui/icons'


export default () => {
  const navigate = useNavigate()
  const location = useLocation()

  const command = useCommand()

  const onError = useCallback(function(error) {
    if (error.response?.status === 403) {
      navigate(`/login?next=${location.pathname}`)
    }
  }, [navigate, location.pathname])

  const onSuccess = useCallback(function(data, key) {
    let output = {}
    if (key.endsWith('/tickets/')) {
      data.forEach(({ title, key }) => {
        output[key] = { name: title, subtitle: 'ticket' }
      })
    }
    if (key.endsWith('/boards/')) {
      data.forEach(({ name, id, slug, }) => {
        const key = `board-${id}`
        const to = `/workspaces/personal/${slug}/`
        output[key] = { name, icon: BoardIcon, subtitle: 'board', callback: () => navigate(to) }
      })
    }
    if (Object.keys(output).length > 0) {
      command.set(output)
    }
  }, [navigate, command])

  const swrConfig = {
    fetcher,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onSuccess,
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
