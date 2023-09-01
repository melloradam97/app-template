import Layout from "@/core/layouts/Layout"
import { useDisclosure } from "@mantine/hooks"
import { Modal, Button, Group, Text, TextInput, Textarea, Box } from "@mantine/core"
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

const UsernamePage = () => {
  const router = useRouter()
  const username = useStringParam("username")
  const [$updateProfile] = useMutation(updateProfile)
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
