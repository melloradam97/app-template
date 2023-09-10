import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Routes } from "@blitzjs/next"
import { RingProgress, Tooltip, Text, List } from "@mantine/core"
import { Vertical } from "mantine-layout-components"
import Link from "next/link"

const UserProfileProgress = () => {
  const user = useCurrentUser()

  if (!user) return null

  const keys = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "bio",
      label: "Bio",
    },
    {
      key: "avatarImageKey",
      label: "Profile picture",
    },
  ]

  const existingKeys = keys.filter((key) => user[key.key])

  const missingKeys = keys.filter((key) => !user[key.key])

  const progress = Math.round((existingKeys.length / keys.length) * 100)

  if (progress === 100) return null

  return (
    <Link href={Routes.EditProfilePage()}>
      <Tooltip
        color="dark"
        label={
          <Vertical spacing="xs">
            <Text fw="bold">{`Profile progress [${progress}%]`}</Text>
            <Vertical spacing={0}>
              <Text>Missing:</Text>
              <List>
                {missingKeys.map((key) => (
                  <List.Item key={key.key}>{key.label}</List.Item>
                ))}
              </List>
            </Vertical>
          </Vertical>
        }
      >
        <RingProgress
          size={25}
          thickness={4}
          roundCaps
          sections={[{ value: progress, color: "red" }]}
        />
      </Tooltip>
    </Link>
  )
}

export default UserProfileProgress
