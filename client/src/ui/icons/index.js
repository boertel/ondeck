import React from 'react'

import { PlusSquare, Clipboard, Search, Trash2 } from 'react-feather'

const SearchIcon = (props) => <Search width="1em" height="1em" {...props} />

export {
  Clipboard as BoardIcon,
  SearchIcon,
  Trash2 as TrashIcon,
  PlusSquare as AddIcon,
}
