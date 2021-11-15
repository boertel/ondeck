import { useMemo } from 'react'
import { useForm } from 'react-form'

import { View } from '../ui'
import { InputField } from './fields'
import { mutateWorkspace } from '../resources/workspaces'

export default function AddWorkspaceForm() {
  const defaultValues = useMemo(
    () => ({
      name: '',
      slug: '',
      key: '',
    }),
    []
  )

  const onSubmit = async (values) => {
    await mutateWorkspace(values)
  }

  const { Form } = useForm({
    defaultValues,
    onSubmit,
  })

  return (
    <Form>
      <View flexDirection="column" $gap="18px">
        <View flexDirection="column">
          <InputField required={true} field="name" label="Name" />
        </View>
        <View flexDirection="column">
          <InputField required={true} field="slug" label="Slug" />
          <em>it will be used for the URL: https://{window.location.host}/&lt;slug&gt;</em>
        </View>
        <View flexDirection="column">
          <InputField required={true} field="key" label="Key" />
          <em>prefix ticket unique identifier i.e KEY-123</em>
        </View>
      </View>
    </Form>
  )
}
