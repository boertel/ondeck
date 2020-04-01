import React from 'react'
import styled from 'styled-components'

import { View } from '../../ui'
import { useUsers } from '../../resources/users'


function UserMenu(props) {
  const { data: user, isLoading } = useUsers('me')
  if (!user) {
    return null
  }
  return (
    <View {...props} radius="0">
      {user.name}
    </View>
  )
}


export default styled(UserMenu)`
  padding: 12px;
  border-top: 1px solid var(--border-color);
`
