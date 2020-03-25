import React, { useMemo } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-form'

import { AddIcon } from '../ui/icons'
import { InputField } from './fields'
import { mutateBoard } from '../resources/board'

function AddBoardForm() {
  const [mutate] = mutateBoard()

  const history = useHistory()
  const { workspaceSlug } = useParams()

  const {
    Form,
    reset,
  } = useForm({
    defaultValues: useMemo(() => ({ name: '' }), []),
    onSubmit: async (values, instance) => {
      const { slug } = await mutate(values)
      reset()
      history.push(`/workspaces/${workspaceSlug}/${slug}`)
    },
  })

  return (
    <Form>
      <InputField icon={AddIcon} field="name" className="transparent" placeholder="Add Board" />
    </Form>
  )
}

export default AddBoardForm
