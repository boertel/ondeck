import React, { useRef, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-form'

import { AddIcon } from '../ui/icons'
import { AutoResizeTextarea } from '../ui'
import { InputField } from './fields'
import { mutateTicket } from '../resources/tickets'
import useShortcut from '../hooks/useShortcut'

const AddQuickTicketForm = ({ title, column }) => {
  const { workspaceSlug, boardSlug } = useParams()
  const navigate = useNavigate()

  const defaultValues = useMemo(() => ({ title }), [title])

  const { Form, handleSubmit, setMeta, reset } = useForm({
    defaultValues,
    onSubmit: async (values, { reset, meta }) => {
      try {
        await mutateTicket({ workspaceSlug, boardSlug }, { ...values, column })
        reset()
        if (meta.onSuccess) {
         //meta.onSuccess(data)
        }
      } catch (exception) {
        console.error(exception)
      }
    },
  })

  const ref = useRef()

  useShortcut(
    {
      // TODO useCallback on these functions?
      enter: evt => {
        handleSubmit()
        evt.preventDefault()
      },
      'meta+enter': () => {
        setMeta(meta => ({ ...meta, onSuccess: ({ pk }) => navigate(pk, { state: { focus: 'description' } }) }))
        handleSubmit()
      },
      escape: () => {
        reset()
      },
    },
    ref
  )

  return (
    <Form>
      <InputField
        ref={ref}
        as={AutoResizeTextarea}
        icon={AddIcon}
        field="title"
        className="full-width transparent"
        placeholder="Add Ticket"
        style={{ margin: '0px' }}
      />
    </Form>
  )
}

AddQuickTicketForm.defaultProps = {
  title: '',
}

export default AddQuickTicketForm
