import React, { useMemo } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-form'

import { Button, View } from '../ui'
import { TrashIcon } from '../ui/icons'
import { mutateTicket, deleteTicket, useTickets } from '../resources/tickets'
import { SelectField, InputField, TextareaField } from './fields'

function TicketForm({ title, description, id, column, parent, onSubmit }) {
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

  const [remove] = deleteTicket()
  const onDelete = async () => {
    await remove(id)
    history.push(`/workspaces/${workspaceSlug}/${boardSlug}`)
  }
  return (
    <Form>
      <InputField label="Title" field="title" required={true} autoFocus={true} />
      <SelectField label="Parent" field="parent" filterValue={v => parseInt(v, 10)}>
        <option />
        {tickets
          .filter(ticket => ticket.id !== id)
          .map(({ id, title }) => (
            <option value={id} key={id}>
              {title}
            </option>
          ))}
      </SelectField>
      <TextareaField label="Description" field="description" />
      <View className="align-center">
        <Button type="submit" disabled={!canSubmit}>
          {!!id ? 'Update' : 'Create'} Ticket
        </Button>
        {isEditing && (
          <Button onClick={onDelete} type="button">
            <TrashIcon />
          </Button>
        )}
      </View>
    </Form>
  )
}

TicketForm.defaultProps = {
  title: '',
  description: '',
}

export default TicketForm
