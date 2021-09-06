import React from 'react'

import {
  PlusSquare,
  Clipboard,
  Search,
  Trash2,
  Edit2,
  ArrowLeft,
  Box,
  MoreHorizontal,
  CreditCard,
  Hexagon as WorkspaceIcon,
  Paperclip,
  Eye,
  X,
} from 'react-feather'

export function SearchIcon(props) {
  return <Search width="1em" height="1em" {...props} />
}

export function AttachmentIcon(props) {
  return <Paperclip {...props} />
}

export function BoardIcon(props) {
  return <Clipboard {...props} />
}

export {
  Trash2 as TrashIcon,
  PlusSquare as AddIcon,
  Edit2 as EditIcon,
  ArrowLeft as BackIcon,
  Box as ActionsIcon,
  MoreHorizontal as PopoverIcon,
  CreditCard as TicketIcon,
  Eye as PreviewIcon,
  WorkspaceIcon,
  X as CloseIcon,
}
