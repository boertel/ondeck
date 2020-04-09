import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-form'

import { Button, View } from '../ui'
import { TrashIcon } from '../ui/icons'
import { mutateTicket, deleteTicket, useTickets } from '../resources/tickets'
import { SelectField, EditorField, InputField } from './fields'

function TicketForm({ title, description, id, column, parent, onSubmit, className }) {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const paramColumn = params.get('column') || column
  const { workspaceSlug, boardSlug, ticketSlug } = useParams()
  const navigate = useNavigate()

  const { data: tickets } = useTickets({ workspaceSlug, boardSlug })

  const defaultValues = useMemo(
    () => ({
      title,
      description,
      column: paramColumn,
      id,
      parent,
    }),
    [title, description, paramColumn, id, parent]
  )

  const [mutate] = mutateTicket({ workspaceSlug, boardSlug, ticketSlug })
  const {
    Form,
    meta: { canSubmit },
    handleSubmit,
  } = useForm({
    defaultValues,
    onSubmit: async (values, { reset }) => {
      try {
        await mutate(values)
        onSubmit()
        reset()
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

  const [remove] = deleteTicket({ workspaceSlug, boardSlug, ticketSlug })
  const onDelete = async () => {
    await remove(id)
    navigate(back)
  }
  return (
    <Form className={className}>
      <View justifyContent="flex-end">
        {isEditing && (
          <Button onClick={onDelete} type="button">
            <TrashIcon />
          </Button>
        )}
      </View>
      <InputField label="Title" field="title" required={true} autoFocus={true} />
      <EditorField label="Description" field="description" />
      <SelectField label="Parent" field="parent" filterValue={v => parseInt(v, 10)}>
        <option />
        {(tickets || [])
          .filter(ticket => ticket.id !== id && !ticket.parent)
          .map(({ id, title, key }) => (
            <option value={id} key={id}>
              {key}: {title}
            </option>
          ))}
      </SelectField>
      <View alignItems="center" justifyContent="space-between">
        <Button to={back} className="link">
          {isEditing ? 'Back' : 'Cancel'}
        </Button>
        <Button type="submit" disabled={!canSubmit}>
          {!!id ? 'Save' : 'Create Ticket'}
        </Button>
      </View>
    </Form>
  )
}

TicketForm.defaultProps = {
  title: '',
  description: '',
}

export default styled(TicketForm)`
  padding: 12px;
  border-radius: var(--border-radius);
  background-color: var(--bg);
`
