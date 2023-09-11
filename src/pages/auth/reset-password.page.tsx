import Layout from "src/core/layouts/Layout"
import resetPassword from "@/features/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { Button, PasswordInput, Text, TextInput, Title } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { ResetPasswordInput, ResetPasswordInputType } from "@/features/auth/schemas"
import { useStringQueryParam } from "@/utils/utils"
import { Vertical } from "mantine-layout-components"

const ResetPasswordPage: BlitzPage = () => {
  const token = useStringQueryParam("token")
  const [$resetPassword, { isSuccess, isLoading }] = useMutation(resetPassword)

  const form = useForm<ResetPasswordInputType>({
    initialValues: {
      password: "",
      passwordConfirmation: "",
      token: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(ResetPasswordInput),
  })

  if (!token) return <Text>Invalid token</Text>

  return (
    <Layout title="Reset Your Password">
      <Vertical>
        <Title order={3}>Set a New Password</Title>

        {isSuccess && (
          <Vertical>
            <Title order={3}>Password Reset Successfully</Title>
            <p>
              Go to the <Link href={Routes.Home()}>homepage</Link>
            </p>
          </Vertical>
        )}

        {!isSuccess && (
          <form
            onSubmit={form.onSubmit(async (values) => {
              await $resetPassword({ ...values, token: token as string })
            })}
          >
            <Vertical fullW>
              <PasswordInput
                w="100%"
                withAsterisk
                label="Password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                w="100%"
                withAsterisk
                label="Password Confirmation"
                {...form.getInputProps("passwordConfirmation")}
              />

              <Button loading={isLoading} disabled={!form.isValid()} type="submit">
                Submit
              </Button>
            </Vertical>
          </form>
        )}
      </Vertical>
    </Layout>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
