import { Button, Menu } from "@mantine/core"
import { IconSettings, IconUser, IconPencil, IconLogout } from "@tabler/icons-react"
import UserAvatar from "../UserAvatar"
import { MenuItemIcon, MenuItemLink } from "./MenuItems"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import { useRouter } from "next/router"

const UserHeaderMenu = ({ user }) => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button size="xs">
          <UserAvatar name={user.name} avatarImageKey={user.avatarImageKey} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <MenuItemLink href={Routes.SettingsPage()} Icon={IconSettings}>
          Settings
        </MenuItemLink>
        <MenuItemLink Icon={IconPencil} href={Routes.EditProfilePage()}>
          Edit Profile
        </MenuItemLink>

        {!!user.username && (
          <MenuItemLink
            Icon={IconUser}
            href={Routes.UsernamePage({
              username: user.username,
            })}
          >
            Go to Profile
          </MenuItemLink>
        )}

        <Menu.Divider />

        <MenuItemIcon
          color="red.4"
          Icon={IconLogout}
          onClick={async () => {
            await logoutMutation()
            router.push(Routes.Home())
          }}
        >
          Logout
        </MenuItemIcon>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserHeaderMenu
