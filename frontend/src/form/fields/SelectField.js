import React from 'react'
import InputField from './InputField'


const SelectField = props => {
  return (
    <InputField as="select" {...props} />
  )
}

export default SelectField
