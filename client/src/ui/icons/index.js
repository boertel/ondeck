import React from 'react'

import { PlusSquare, Clipboard, Search, } from 'react-feather'

const SearchIcon = (props) => <Search width="1em" height="1em" {...props} />

export {
  Clipboard as BoardIcon,
  SearchIcon,
  PlusSquare as AddIcon,
}
