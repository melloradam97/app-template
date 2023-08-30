import { FORM_ERROR } from "src/core/components/Form"
import signup from "@/features/auth/mutations/signup"
import { useMutation } from "@blitzjs/rpc"
import { Button, PasswordInput, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 7 ? null : "Password is too short"),
    },
  })

  const onSubmit = async (values) => {
    try {
      await signupMutation(values)
      props.onSuccess?.()
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        // This error comes from Prisma
        return { email: "This email is already being used" }
      } else {
        return { [FORM_ERROR]: error.toString() }
      }
    }
  }

  return (
    <div>
      <Title>Create an Account</Title>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Please enter your name"
          {...form.getInputProps("name")}
        />

        <PasswordInput withAsterisk label="Password" {...form.getInputProps("password")} />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

export default SignupForm
