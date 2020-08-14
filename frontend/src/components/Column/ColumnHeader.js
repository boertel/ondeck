import React from 'react'

import { PopoverIcon } from '../../ui/icons'
import { AddColumnForm } from '../../form'


function ColumnHeader({ name, id, children, ...props }) {
  return (
    <>
      <AddColumnForm name={name} id={id} />
      {children}
      <PopoverIcon />
    </>
  )
}

export default ColumnHeader
