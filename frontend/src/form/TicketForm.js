import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useLocation, useParams, useNavigate, Prompt } from 'react-router-dom'
import { useForm } from 'react-form'

import { Button, View, Loading } from '../ui'
import { TrashIcon } from '../ui/icons'
import { useUsers } from '../resources'
import { mutateTicket, deleteTicket, useTickets } from '../resources/tickets'
import { SelectField, EditorField, InputField, ComboBoxField } from './fields'

function TicketForm({ title, description, id, column, members, parent, onSubmit, className, position }) {
  const location = useLocation()
  const { focus = !!title ? 'description' : 'title' } = location.state || {}
  const params = new URLSearchParams(location.search)
  const paramColumn = params.get('column') || column
  const { workspaceSlug, boardSlug, ticketSlug } = useParams()
  const navigate = useNavigate()

  const { data: users } = useUsers({ workspaceSlug })
  const options = (users || []).map(({ name, id }) => ({
    value: { id, role: 'assignee' },
    label: name,
  }))
  const { data: tickets } = useTickets({ workspaceSlug, boardSlug })

  const defaultValues = useMemo(
    () => ({
      title,
      description,
      column: paramColumn,
      id,
      parent,
      members,
      position,
    }),
    [title, description, paramColumn, id, parent, members, position]
  )

  const {
    Form,
    meta: { canSubmit, isSubmitting, isTouched, isSubmitted },
    handleSubmit,
  } = useForm({
    defaultValues,
    onSubmit: async (values, { reset }) => {
      try {
        mutateTicket({ workspaceSlug, boardSlug, ticketSlug }, values)
        onSubmit()
      } catch (exception) {
        console.error(exception)
      }
    },
  })

  useEffect(() => {
    const onMetaEnter = (evt) => {
      if (evt.metaKey && evt.key === 'Enter') {
        handleSubmit()
      }
    }
    window.addEventListener('keydown', onMetaEnter)
    return () => window.removeEventListener('keydown', onMetaEnter)
  }, [handleSubmit])

  const isEditing = !!id
  const back = `/workspaces/${workspaceSlug}/${boardSlug}`

  const onDelete = async () => {
    deleteTicket({ workspaceSlug, boardSlug, ticketSlug })
    navigate(back)
  }
  return (
    <Form className={className}>
      <Prompt when={isTouched === true && isSubmitted === false} message="Are you sure you want to leave this page?" />
      <View justifyContent="flex-end">
        {isEditing && (
          <Button onClick={onDelete} type="button">
            <TrashIcon />
          </Button>
        )}
      </View>
      <InputField label="Title" field="title" required={true} autoFocus={focus === 'title'} />
      <EditorField label="Description" field="description" autoFocus={focus === 'description'} />
      <SelectField label="Parent" field="parent" filterValue={(v) => parseInt(v, 10)}>
        <option value="" />
        {(tickets || [])
          .filter((ticket) => ticket.id !== id && !ticket.parent)
          .map(({ id, title, key }) => (
            <option value={id} key={id}>
              {key}: {title}
            </option>
          ))}
      </SelectField>
      <ComboBoxField label="Assignees" field="members" options={options} isMulti={true} />
      <View alignItems="center" justifyContent="space-between">
        <Button to={back} className="link">
          {isEditing ? 'Back' : 'Cancel'}
        </Button>
        <Button type="submit" disabled={!canSubmit}>
          {isSubmitting ? <Loading /> : !!id ? 'Save' : 'Create Ticket'}
        </Button>
      </View>
    </Form>
  )
}

TicketForm.defaultProps = {
  title: '',
  description: '',
  assignees: [],
}

export default styled(TicketForm)`
  padding: 12px;
  border-radius: var(--border-radius);
  background-color: var(--bg);
`
