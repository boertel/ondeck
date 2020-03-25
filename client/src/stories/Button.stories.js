import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

import Button from '../ui/Button'
import { AddIcon } from '../ui/icons'

export default {
  component: Button,
  title: 'Button',
  decorators: [withKnobs],
}

export const Default = () => (
  <>
    <Button>Save</Button>
    <Button>
      <AddIcon />
    </Button>
  </>
)

export const ButtonWithKnobs = () => {
  const sizes = {
    small: 'small',
    medium: 'medium',
    large: 'large',
  }
  return (
    <>
      <Button size={select('size', sizes)}>Update</Button>
    </>
  )
}
