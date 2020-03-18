import React from 'react';
import { action } from '@storybook/addon-actions';

import Input from '../ui/Input';
import Editor from '../ui/Editor';
import { AddIcon } from '../ui/icons';

export default {
  component: Input,
  title: 'Input',
}

export const Default = () => <Input />
export const InputWithLabel = () => <Input label="This is a label" />
export const InputWithIcon = () => <Input icon={AddIcon} />
export const InputWithIconAndLabel = () => <Input icon={AddIcon} label="My Label" />
export const InputWithIconPrimay = () => <Input className="primary" icon={AddIcon} />

export const Select = () => <Input forwardedAs="select"><option>1</option></Input>
export const SelectWithLabel = () => <Input label="My Label" forwardedAs="select"><option>1</option></Input>
export const SelectWithIcon = () => <Input icon={AddIcon} forwardedAs="select"><option>1</option></Input>
export const SelectWithIconAndLabel = () => <Input icon={AddIcon} label="My Label" forwardedAs="select"><option>1</option></Input>

export const Textarea = () => <Input forwardedAs="textarea" />
export const TextareaWithLabel = () => <Input label="My Label" forwardedAs="textarea" />
export const TextareaWithIcon = () => <Input icon={AddIcon} forwardedAs="textarea" />
export const TextareaWithIconAndLabel = () => <Input icon={AddIcon} label="My Label" forwardedAs="textarea" />

export const DefaultEditor = () => <div><Input forwardedAs={Editor} /></div>
export const EditorWithLabel = () => <Input label="My Label" forwardedAs={Editor} />
export const EditorWithIcon = () => <Input icon={AddIcon} forwardedAs={Editor} />
export const EditorWithIconAndLabel = () => <Input icon={AddIcon} label="My Label" forwardedAs={Editor} />
