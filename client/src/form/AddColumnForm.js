import React, { useMemo } from 'react'
import { useForm } from 'react-form'

import { Button } from '../ui'
import { InputField } from './fields'
import { mutateColumn } from '../resources/columns'

function AddColumnForm() {
  const [mutate] = mutateColumn()

  const {
    Form,
    meta: { canSubmit },
    reset,
  } = useForm({
    defaultValues: useMemo(() => ({ name: '' }), []),
    onSubmit: async (values, instance) => {
      await mutate(values)
      reset()
    },
  })

  return (
    <Form>
      <InputField field="name" required={true} />
      <Button type="submit" disabled={!canSubmit}>
        Add Column
      </Button>
    </Form>
  )
}

export default AddColumnForm
