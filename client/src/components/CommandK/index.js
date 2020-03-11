import React from 'react';
import { useParams } from 'react-router-dom'


function CommandK() {
  console.log(useParams())
  return (
    <div>
      <input type="text" autoFocus={true} />
    </div>
  )
}

export default CommandK
