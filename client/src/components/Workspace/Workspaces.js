import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useWorkspaces } from '../../resources/workspaces'
import { ComboBoxInput, } from '../../ui'

const Workspaces = ({ workspaceSlug} ) => {
  const navigate = useNavigate()
  const { data: workspaces, } = useWorkspaces()

  const options = (workspaces || []).map(({ name, slug }) => ({
    value: slug,
    label: name,
  }))

  const value = options.find(({ slug }) => slug === workspaceSlug)

  const onChange = ({ value }) => navigate(`/workspaces/${value}/`)
  return (
    <ComboBoxInput options={options} onChange={onChange} value={value} />
  )
}

export default Workspaces
