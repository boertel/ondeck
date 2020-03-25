import React, { useState, useMemo } from 'react'
import { useForm } from 'react-form'

import { View, Button } from '../ui'
import { EditIcon } from '../ui/icons'
import { InputField } from './fields'
import { mutateColumn } from '../resources/columns'

function AddColumnForm({ name, id }) {
  const [mutate] = mutateColumn()

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

  return (
    <Form>
      <InputField field="name" className="transparent" required={true} />
    </Form>
  )
}

export default AddColumnForm
