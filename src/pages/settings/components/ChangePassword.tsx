import changePasswordForLoggedIn from "@/features/auth/mutations/changePasswordForLoggedIn"
import { ChangePasswordInput, ChangePasswordInputType } from "@/features/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import { Button, Card, PasswordInput, Title, Text } from "@mantine/core"
import { Form, useForm, zodResolver } from "@mantine/form"
import { Vertical } from "mantine-layout-components"

const ChangePassword = () => {
  const [$changePasswordForLoggedIn, { isLoading, isSuccess }] =
    useMutation(changePasswordForLoggedIn)

  const form = useForm<ChangePasswordInputType>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(ChangePasswordInput),
  })
  return (
    <Card withBorder w="100%" maw={300}>
      {isSuccess && <Text>Password changed successfully</Text>}
      {!isSuccess && (
        <Vertical fullW>
          <Title order={4}>Change password</Title>
          <Vertical fullW>
            <Form
              style={{ width: "100%" }}
              form={form}
              onSubmit={async (values) => {
                await $changePasswordForLoggedIn({ ...values })
              }}
            >
              <Vertical fullW>
                <PasswordInput
                  w="100%"
                  withAsterisk
                  label="Current Password"
                  {...form.getInputProps("currentPassword")}
                />
                <PasswordInput
                  w="100%"
                  withAsterisk
                  label="New Password"
                  {...form.getInputProps("newPassword")}
                />
                <PasswordInput
                  w="100%"
                  withAsterisk
                  label="New Password Confirmation"
                  {...form.getInputProps("newPasswordConfirmation")}
                />

                <Button loading={isLoading} disabled={!form.isValid()} type="submit">
                  Submit
                </Button>
              </Vertical>
            </Form>
          </Vertical>
        </Vertical>
      )}
    </Card>
  )
}

export default ChangePassword
