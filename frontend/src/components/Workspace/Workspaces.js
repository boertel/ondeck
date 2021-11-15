import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { useWorkspaces, mutateWorkspace } from '../../resources/workspaces'
import { ComboBoxInput } from '../../ui'

const Workspaces = ({ workspaceSlug, className }) => {
  const navigate = useNavigate()
  const { data: workspaces } = useWorkspaces()

  const options = (workspaces || []).map(({ name, slug }) => ({
    value: slug,
    label: name,
  }))

  const value = options.find(({ slug }) => slug === workspaceSlug)

  const onChange = ({ value }) => navigate(`/workspaces/${value}/`)
  const createNewWorkspace = async ({ value }) => {
    try {
      const workspace = await mutateWorkspace({ name: value })
      navigate(`/workspaces/${workspace.slug}/`)
    } catch (exception) {
      console.error(exception)
    }
  }
  return (
    <div className={className}>
      <ComboBoxInput options={options} onChange={onChange} value={value} onCreate={createNewWorkspace} />
      {/*<AddWorkspaceForm />*/}
    </div>
  )
}

export default styled(Workspaces)`
  max-width: 760px;
  margin: 0 auto;
  padding: 20px;
`
