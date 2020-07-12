import React, { useMemo } from 'react'
import { useParams, } from 'react-router-dom'
import { useForm } from 'react-form'

import { Button } from '../ui'
import { EditorField } from './fields'
import { mutateComment } from '../resources/comments'

function AddCommentForm({ message }) {
  const { workspaceSlug, boardSlug, ticketSlug } = useParams()

  const {
    Form,
    reset,
  } = useForm({
    defaultValues: useMemo(() => ({ message, }), [message]),
    onSubmit: async (values, instance) => {
      await mutateComment({ workspaceSlug, boardSlug, ticketSlug }, values)
      reset()
    },
  })

  return (
    <Form>
      <EditorField field="message" placeholder="Add a comment" />
      <Button type="submit">Save</Button>
    </Form>
  )
}

AddCommentForm.defaultProps = {
  message: '',
}

export default AddCommentForm
