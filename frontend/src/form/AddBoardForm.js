import React, { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-form'

import { AddIcon } from '../ui/icons'
import { InputField } from './fields'
import { mutateBoard } from '../resources/boards'

function AddBoardForm({ name }) {
  const { workspaceSlug, boardSlug } = useParams()

  const navigate = useNavigate()

  const {
    Form,
    reset,
  } = useForm({
    defaultValues: useMemo(() => ({ name, }), [name]),
    onSubmit: async (values, instance) => {
      const boards = mutateBoard({ workspaceSlug, }, values)
      if (!boardSlug) {
        const { slug } = boards[boards.length - 1]
        reset()
        navigate(`/workspaces/${workspaceSlug}/${slug}`)
      }
    },
  })

  return (
    <Form>
      <InputField icon={AddIcon} field="name" className="transparent full-width" placeholder="Add Board" />
    </Form>
  )
}

AddBoardForm.defaultProps = {
  name: '',
}

export default AddBoardForm
