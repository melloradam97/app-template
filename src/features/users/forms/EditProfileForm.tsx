import { Button, TextInput, Textarea } from "@mantine/core"

import { Form, UseFormReturnType } from "@mantine/form"
import { Vertical } from "mantine-layout-components"
import { UpdateProfileInputType } from "../schemas"
import UploadThingFileInput from "@/core/components/UploadThingFileInput"

const EditProfileForm: React.FC<{
  form: UseFormReturnType<UpdateProfileInputType>
  onSubmit: (values: UpdateProfileInputType) => Promise<void>
  isSubmitting: boolean
}> = ({ onSubmit, form, isSubmitting }) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Vertical fullH>
        <TextInput
          w="100%"
          required
          label="Name"
          placeholder="Your name"
          {...form.getInputProps("name")}
          radius="md"
        />
        <TextInput
          w="100%"
          required
          label="Username"
          placeholder="Your username"
          {...form.getInputProps("username")}
          radius="md"
        />
        <Textarea
          w="100%"
          required
          label="Bio"
          placeholder="Your bio"
          {...form.getInputProps("bio")}
          radius="md"
        />

        <UploadThingFileInput form={form} name="avatarImageKey" label="Profile picture" />
        <UploadThingFileInput form={form} name="coverImageKey" label="Cover image" />

        <Button
          disabled={!form.isValid()}
          loading={isSubmitting}
          type="submit"
          variant="outline"
          color="blue"
        >
          Save
        </Button>
      </Vertical>
    </Form>
  )
}

export default EditProfileForm
