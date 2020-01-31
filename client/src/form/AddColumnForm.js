import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-form";

import { Button } from "../ui";
import { InputField } from "./fields";
import { addColumn } from '../resources/columns';

function AddColumnForm() {
  const [mutate] = addColumn(useParams())

  const {
    Form,
    meta: { isSubmitting, canSubmit },
    reset
  } = useForm({
    defaultValues: useMemo(() => ({ name: "" }), []),
    onSubmit: async (values, instance) => {
      await mutate(values);
      reset();
    }
  });

  return (
    <Form>
      <InputField field="name" required={true} />
      <Button type="submit" disabled={!canSubmit}>
        Add Column
      </Button>
    </Form>
  );
}

export default AddColumnForm;
