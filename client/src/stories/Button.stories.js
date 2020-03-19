import React from 'react'
import { action } from '@storybook/addon-actions'

import Button from '../ui/Button'
import { AddIcon } from '../ui/icons'

export default {
  component: Button,
  title: 'Button',
}

export const Default = () => (
  <>
    <Button>Save</Button>
    <Button>
      <AddIcon />
    </Button>
  </>
)
