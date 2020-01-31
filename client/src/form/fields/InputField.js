import React from 'react'
import { useField, splitFormProps } from "react-form";

import { Input } from '../../ui'


const InputField = React.forwardRef((props, ref) => {
  const [field, fieldOptions, rest] = splitFormProps(props);

  const {
    meta: { error, isTouched, isValidating },
    getInputProps
  } = useField(field, fieldOptions);

  return (
    <Input {...getInputProps({ ref, ...rest })} />
  )
})

InputField.defaultProps = {
  type: 'text',
}

export default InputField
