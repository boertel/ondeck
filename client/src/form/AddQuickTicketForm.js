import React, { useMemo, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-form'

import { AddIcon } from '../ui/icons'
import { InputField } from './fields'
import { mutateTicket, } from '../resources/tickets'

const AddQuickTicketForm = ({ title, column }) => {
  const { workspaceSlug, boardSlug, } = useParams()
  const navigate = useNavigate()
  const [mutate] = mutateTicket({ workspaceSlug, boardSlug, })

  const defaultValues = useMemo(() => ({ title,}), [title])

  const {
    Form,
    handleSubmit,
    setMeta,
  } = useForm({
    defaultValues,
    onSubmit: async (values, { reset, meta, }) => {
      try {
        const data = await mutate({...values, column, })
        reset()
        if (meta.onSuccess) {
          meta.onSuccess(data)
        }
      } catch (exception) {
        console.error(exception)
      }
    },
  })

  useEffect(() => {
    const onMetaEnter = (evt) => {
      if (evt.metaKey && evt.key === 'Enter') {
        setMeta(meta => ({ ...meta, onSuccess: ({ pk }) => navigate(pk) }))
        handleSubmit()
      }
    }
    window.addEventListener('keydown', onMetaEnter)
    return () => window.removeEventListener('keydown', onMetaEnter)
  }, [handleSubmit])

  return (
    <Form>
      <InputField icon={AddIcon} field="title" className="full-width" placeholder="Add Ticket" />
    </Form>
  )
}

AddQuickTicketForm.defaultProps = {
  title: '',
}

export default AddQuickTicketForm
