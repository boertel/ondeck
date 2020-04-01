import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-form'

import { InputField } from './fields'
import { mutateColumn } from '../resources/columns'

function AddColumnForm({ name, id }) {
  const params = useParams()
  const [mutate] = mutateColumn(params)

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
      <InputField field="name" className="transparent" required={true} autoFocus={!isEditing} />
    </Form>
  )
}

AddColumnForm.defaultProps = {
  name: '',
}

export default AddColumnForm
