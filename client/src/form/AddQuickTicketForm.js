import React, { useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-form'

import { AddIcon } from '../ui/icons'
import { InputField } from './fields'
import { mutateTicket } from '../resources/tickets'
import useShortcut from '../hooks/useShortcut'

const AddQuickTicketForm = ({ title, column, cancel }) => {
  const { workspaceSlug, boardSlug } = useParams()
  const navigate = useNavigate()
  const [mutate] = mutateTicket({ workspaceSlug, boardSlug })

  const defaultValues = useMemo(() => ({ title }), [title])

  const { Form, handleSubmit, setMeta, reset, } = useForm({
    defaultValues,
    onSubmit: async (values, { reset, meta }) => {
      try {
        const data = await mutate({ ...values, column })
        reset()
        if (meta.onSuccess) {
          meta.onSuccess(data)
        }
      } catch (exception) {
        console.error(exception)
      }
    },
  })

  useShortcut({
    // TODO useCallback on these functions?
    'meta+enter': () => {
      setMeta(meta => ({ ...meta, onSuccess: ({ pk }) => navigate(pk, { state: { focus: 'description'}}) }))
      handleSubmit()
    },
    'escape': () => {
      reset()
      cancel()
    }
  })

  return (
    <Form>
      <InputField icon={AddIcon} field="title" className="full-width" placeholder="Add Ticket" autoFocus={true} />
    </Form>
  )
}

AddQuickTicketForm.defaultProps = {
  title: '',
}

export default AddQuickTicketForm
