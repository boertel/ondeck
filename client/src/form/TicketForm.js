import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useForm } from 'react-form'

import { Button, View } from '../ui'
import { TrashIcon } from '../ui/icons'
import { mutateTicket, deleteTicket } from '../resources/tickets'
import { InputField, TextareaField } from './fields'

function TicketForm({ title, description, id, column, onSubmit }) {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const paramColumn = params.get('column') || column

  const defaultValues = useMemo(
    () => ({
      title,
      description,
      column: paramColumn,
      id,
    }),
    [title, description, paramColumn, id]
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

  const [ remove ] = deleteTicket()
  const onDelete = () => remove(id)
  return (
    <Form>
      <InputField label="Title" field="title" required={true} autoFocus={true} />
      <TextareaField label="Description" field="description" />
      <View className="align-center">
        <Button type="submit" disabled={!canSubmit}>
          {!!id ? 'Update' : 'Create'} Ticket
        </Button>
        <a onClick={onSubmit}>Cancel</a>
        <a onClick={onDelete}><TrashIcon /></a>
      </View>
    </Form>
  )
}

TicketForm.defaultProps = {
  title: '',
  description: '',
}

export default TicketForm
