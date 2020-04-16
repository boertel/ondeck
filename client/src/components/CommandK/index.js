import React from 'react';
import { useParams } from 'react-router-dom'

import ComboBoxInput from '../../ui/ComboBoxInput'


function CommandK() {
  console.log(useParams())
  return (
    <div>
      <ComboBoxInput />
    </div>
  )
}

export default CommandK
