import React from 'react'
import { isEqual } from 'lodash'
import { useField, splitFormProps } from 'react-form'

import { ComboBoxInput } from '../../ui'

const ComboBoxField = props => {
  const [field, fieldOptions, { options, isMulti, ...rest }] = splitFormProps(props)

  const { value = [], setValue } = useField(field, fieldOptions)

  // TODO handle isMulti false
  // TODO handle when value IS NOT [{ role: assignee, id: 11 }]
  const optionValues = options.filter(option => {
    return value.find(v => isEqual(v, option.value))
  })
  const handleChange = args => {
    setValue(args.map(({ value }) => value))
  }

  return <ComboBoxInput {...rest} options={options} value={optionValues} onChange={handleChange} isMulti={isMulti} />
}

export default ComboBoxField
