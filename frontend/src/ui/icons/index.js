import React from 'react'

import { PlusSquare, Clipboard, Search, Trash2, Edit2, ArrowLeft, Box, MoreHorizontal, CreditCard, Hexagon as WorkspaceIcon } from 'react-feather'

const SearchIcon = (props) => <Search width="1em" height="1em" {...props} />

export {
  Clipboard as BoardIcon,
  SearchIcon,
  Trash2 as TrashIcon,
  PlusSquare as AddIcon,
  Edit2 as EditIcon,
  ArrowLeft as BackIcon,
  Box as ActionsIcon,
  MoreHorizontal as PopoverIcon,
  CreditCard as TicketIcon,
  WorkspaceIcon,
}
