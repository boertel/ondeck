import React from 'react';
import { useParams } from 'react-router-dom'

import SearchInput from '../../ui/SearchInput'


function CommandK() {
  console.log(useParams())
  return (
    <div>
      <SearchInput />
    </div>
  )
}

export default CommandK
