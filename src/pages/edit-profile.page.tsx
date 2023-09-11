import Layout from "@/core/layouts/Layout"
import EditProfileForm from "@/features/users/forms/EditProfileForm"
import updateProfile from "@/features/users/mutations/updateProfile"
import getUserForEditingProfile from "@/features/users/queries/getUserForEditingProfile"
import { UpdateProfileInput, UpdateProfileInputType } from "@/features/users/schemas"
import { Routes } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useForm, zodResolver } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { Vertical } from "mantine-layout-components"
import { useRouter } from "next/router"

const EditProfilePage = () => {
  const router = useRouter()
  const [$updateProfile, { isLoading, isSuccess }] = useMutation(updateProfile)

  const [data] = useQuery(getUserForEditingProfile, {})

  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: data?.name || "",
      username: data?.username || "",
      bio: data?.bio || "",
      avatarImageKey: data?.avatarImageKey || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  return (
    <Layout>
      <Vertical>
        <EditProfileForm
          form={form}
          onSubmit={async (values) => {
            $updateProfile(values)
            if (isSuccess) {
              const { username } = values
              if (username) {
                router.push(Routes.UsernamePage({ username }))
              }
              notifications.show({
                title: "Profile updated",
                color: "green",
                message: "Profile updated successfully",
              })
            }
          }}
          isSubmitting={isLoading}
        />
      </Vertical>
    </Layout>
  )
}

export default EditProfilePage
