import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-form'

import { InputField } from './fields'
import { mutateColumn } from '../resources/columns'
import useShortcut from '../hooks/useShortcut'

function AddColumnForm({ name, id, cancel }) {
  const { workspaceSlug, boardSlug } = useParams()
  const [mutate] = mutateColumn({ workspaceSlug, boardSlug })

  const isEditing = !!id

  const { Form, reset } = useForm({
    defaultValues: useMemo(() => ({ name, id }), [name, id]),
    onSubmit: async (values, instance) => {
      await mutate(values)
      if (!isEditing) {
        reset()
      }
    },
  })

  const callback = !!cancel && function() {
    reset()
    cancel()
  }

  useShortcut('escape', callback)

  return (
    <Form>
      <InputField field="name" className="transparent" required={true} autoFocus={!isEditing} />
    </Form>
  )
}

AddColumnForm.defaultProps = {
  name: '',
}

export default AddColumnForm
