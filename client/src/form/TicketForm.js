import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-form'

import { Button, View } from '../ui'
import { TrashIcon } from '../ui/icons'
import { mutateTicket, deleteTicket, useTickets } from '../resources/tickets'
import { SelectField, EditorField, InputField } from './fields'

function TicketForm({ title, description, id, column, parent, onSubmit, className }) {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const paramColumn = params.get('column') || column
  const { workspaceSlug, boardSlug } = useParams()
  const history = useHistory()

  const { tickets } = useTickets()

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

  const [mutate] = mutateTicket()
  const {
    Form,
    meta: { canSubmit },
  } = useForm({
    defaultValues,
    onSubmit: async (values, { reset }) => {
      try {
        await mutate(values, { waitForRefetchQueries: true })
        reset()
        onSubmit()
      } catch (exception) {
        console.error(exception)
      }
    },
  })

  const isEditing = !!id
  const back = `/workspaces/${workspaceSlug}/${boardSlug}`

  const [remove] = deleteTicket()
  const onDelete = async () => {
    await remove(id)
    history.push(back)
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
        {tickets
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
