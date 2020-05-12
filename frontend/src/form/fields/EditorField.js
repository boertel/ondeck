import React from 'react'

import { Editor } from '../../ui'
import InputField from './InputField'


function EditorField(props) {
  return <InputField as={Editor} {...props} />
}

export default EditorField
