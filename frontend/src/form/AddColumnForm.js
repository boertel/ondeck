import React, { useMemo, useCallback } from 'react'
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

  function callback() {
    if (!!cancel) {
      reset()
      cancel()
    }
  }

  useShortcut({
    'escape': useCallback(callback, [cancel])
    })

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
