import React, { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CmdK from '@boertel/cmdk'
import '@boertel/cmdk/dist/cmdk.cjs.development.css'

import { BoardIcon, TicketIcon, WorkspaceIcon } from '../../ui/icons'
import { search } from '../../resources/api'

const ICONS = {
  board: BoardIcon,
  ticket: TicketIcon,
  workspace: WorkspaceIcon,
}

const Command = (props) => {
  const navigate = useNavigate()
  const { workspaceSlug } = useParams()
  const getOptions = useCallback(
    (q) => {
      return search.get('/query/', { params: { q, workspace: workspaceSlug } }).then(({ data }) =>
        data.results.map((result) => ({
          ...result,
          icon: ICONS[result.subtitle],
          callback: () => navigate(result.to),
        }))
      )
    },
    [navigate, workspaceSlug]
  )
  return <CmdK {...props} getOptions={getOptions} />
}

export default Command
