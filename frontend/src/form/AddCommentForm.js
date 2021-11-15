import React, { useCallback, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-form'

import { Input, Button } from '../ui'
import { EditorField } from './fields'
import { mutateComment } from '../resources/comments'

function AddCommentForm({ message }) {
  const { workspaceSlug, boardSlug, ticketSlug } = useParams()

  const { Form, reset } = useForm({
    defaultValues: useMemo(() => ({ message }), [message]),
    onSubmit: async (values, instance) => {
      await mutateComment({ workspaceSlug, boardSlug, ticketSlug }, values)
      reset()
    },
  })

  const [showFullEditor, setShowFullEditor] = useState(false)

  const onBlur = useCallback((evt) => {
    if (!evt.target.value) {
      setShowFullEditor(false)
    }
  }, [])

  return (
    <Form>
      {showFullEditor ? (
        <>
          <EditorField field="message" placeholder="Add a comment" autoFocus={true} onBlur={onBlur} />
          <Button type="submit">Comment</Button>
        </>
      ) : (
        <Input onClick={() => setShowFullEditor(true)} placeholder="Add a comment" />
      )}
    </Form>
  )
}

AddCommentForm.defaultProps = {
  message: '',
}

export default AddCommentForm
