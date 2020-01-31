import React, { useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-form";

import { Button, View } from "../ui";
import { addTicket } from '../resources/tickets'
import { InputField } from "./fields";

function TicketForm({ title, description, onSubmit }) {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const column = params.get('column')

  const defaultValues = useMemo(() => ({
    title,
    description,
    column,
  }), [title, description, column])

  const [mutate] = addTicket(useParams())
  const {
    Form,
    meta: { canSubmit, },
  } = useForm({
    defaultValues,
    onSubmit: async (values, { reset }) => {
      await mutate(values)
      reset()
      onSubmit()
    }
  })
  return (
    <Form>
      <InputField label="Title" field="title" required={true} autoFocus={true} />
      <InputField label="Description" field="description" required={true} />
      <View>
        <Button type="submit" disabled={!canSubmit}>Create Ticket</Button>
        <a onClick={onSubmit}>Cancel</a>
      </View>
    </Form>
  );
}

TicketForm.defaultProps = {
  title: '',
  description: '',
}

export default TicketForm;
