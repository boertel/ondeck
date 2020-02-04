import React, { useState, useMemo } from 'react'
import styled from 'styled-components/macro'
import classNames from 'classnames'
import { useForm } from 'react-form'

import { Button } from '../ui'
import { AddIcon } from '../ui/icons'
import { InputField } from './fields'
import { mutateBoard } from '../resources/board'

function AddBoardForm({ className, }) {
  const [showForm, setShowForm] = useState(false)
  const [mutate] = mutateBoard()

  const toggleForm = () => setShowForm(!showForm)

  const {
    Form,
    meta: { isSubmitting, canSubmit },
    reset,
  } = useForm({
    defaultValues: useMemo(() => ({ name: '' }), []),
    onSubmit: async (values, instance) => {
      await mutate(values)
      reset()
    },
  })

  return (
    <div className={className}>
      <Button onClick={toggleForm} className="outline"><AddIcon /> Add Board</Button>
      <Form className={classNames({ showForm })}>
        <InputField field="name" required={true} autoFocus={showForm} />
        <Button type="submit" disabled={!canSubmit}>
          Add Board
        </Button>
      </Form>
    </div>
  )
}

export default styled(AddBoardForm)`
  form {
    opacity: 0;
    transition: opacity .2s ease-in-out;
  }
  form.showForm {
    opacity: 1;
  }
`
