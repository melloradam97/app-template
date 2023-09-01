import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm, zodResolver } from "@mantine/form"
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core"
import { GoogleButton, TwitterButton } from "./Icons/SocialButtons"
import { useMutation } from "@blitzjs/rpc"
import login from "@/features/auth/mutations/login"
import signup from "@/features/auth/mutations/signup"
import { Vertical } from "mantine-layout-components"
import { SignupInput } from "@/features/auth/schemas"
import { z } from "zod"

type SignupFormType = z.infer<typeof SignupInput>

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"])
  const [$login, { isLoading: isLoggingIn }] = useMutation(login)
  const [$signup, { isLoading: isSigningUp }] = useMutation(signup)

  const form = useForm<SignupFormType>({
    validate: zodResolver(SignupInput),
    validateInputOnBlur: true,
  })

  const loading = isLoggingIn || isSigningUp

  return (
    <Vertical mih="100vh" center fullH fullW>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Mantine, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit((values) => {
            if (type === "login") {
              $login(values)
            } else {
              $signup(values)
            }
          })}
        >
          <Stack>
            {type === "register" && (
              <TextInput
                withAsterisk
                label="Name"
                placeholder="Your name"
                {...form.getInputProps("name")}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              radius="md"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button disabled={!form.isValid()} loading={loading} type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  )
}
