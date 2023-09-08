import Layout from "@/core/layouts/Layout"

import { IconAlertCircle } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { Modal, Button, Group, Text, TextInput, Textarea, Box, Alert } from "@mantine/core"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import getUserForProfile from "@/features/users/queries/getUserForProfile"
import { useStringParam } from "@/utils/utils"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { Vertical } from "mantine-layout-components"
import { Form, useForm, zodResolver } from "@mantine/form"
import updateProfile from "@/features/users/mutations/updateProfile"
import { UpdateProfileInput, UpdateProfileInputType } from "@/features/users/schemas"
import { notifications } from "@mantine/notifications"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import EditProfileForm from "@/features/users/forms/EditProfileForm"
import sendVerificationEmail from "@/features/auth/mutations/sendVerificationEmail"

const UsernamePage = () => {
  const router = useRouter()
  const username = useStringParam("username")
  const [$updateProfile] = useMutation(updateProfile)
  const [$sendVerificationEmail, { isLoading: isSendingEmail, isSuccess }] =
    useMutation(sendVerificationEmail)
  const [opened, { open, close }] = useDisclosure(false)

  const [user, { isLoading }] = useQuery(
    getUserForProfile,
    { username: username || "" },
    { enabled: !!username }
  )

  const currentUser = useCurrentUser()

  const isOwner = currentUser?.id === user?.id

  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  if (!user) return <Text>User not found :( </Text>

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close()
          form.reset()
        }}
        title="Edit profile"
      >
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            $updateProfile(values)
            const { username } = values
            if (username !== user.username) {
              if (username) {
                router.push(Routes.UsernamePage({ username }))
              }
            }
            notifications.show({
              title: "Profile updated",
              color: "green",
              message: "Profile updated successfully",
            })
          }}
          isSubmitting={isLoading}
        />
      </Modal>

      <Layout title="Username">
        <Vertical>
          {isOwner && !currentUser?.emailVerified && (
            <Alert
              variant="outline"
              icon={<IconAlertCircle size="1rem" />}
              title="Uh oh!"
              color="red"
            >
              <Vertical>
                {!isSuccess && (
                  <>
                    <Text>
                      Your email is not verified. Please check your inbox for a verification email.
                    </Text>
                    <Button
                      loading={isSendingEmail}
                      onClick={async () => {
                        await $sendVerificationEmail()
                        notifications.show({
                          color: "green",
                          title: "Success",
                          message: "Verification email sent successfully",
                        })
                      }}
                      size="xs"
                      variant="light"
                      color="red"
                    >
                      Resend verification email
                    </Button>
                  </>
                )}

                {isSuccess && (
                  <Text>
                    The email has been sent and should arrive in the next few minutes. Please be
                    patient and check your spam folder.
                  </Text>
                )}
              </Vertical>
            </Alert>
          )}
          {isOwner && (
            <Button onClick={open} variant="outline" color="blue">
              Edit profile
            </Button>
          )}
          <Text>Hello {username}</Text>
          <Text>{user.bio}</Text>
        </Vertical>
      </Layout>
    </>
  )
}

export default UsernamePage
