import { Button, Menu, Text } from "@mantine/core"
import {
  IconArrowsLeftRight,
  IconSettings,
  IconUser,
  IconPencil,
  IconLogout,
} from "@tabler/icons-react"
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
        <UserAvatar name={user.name} avatarImageKey={user.avatarImageKey} />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <MenuItemLink href={Routes.SettingsPage()} Icon={IconSettings}>
          Settings
        </MenuItemLink>
        <MenuItemLink Icon={IconPencil} href={Routes.EditProfilePage()}>
          Edit Profile
        </MenuItemLink>
        <MenuItemLink
          Icon={IconUser}
          href={Routes.UsernamePage({
            username: user.username,
          })}
        >
          Go to Profile
        </MenuItemLink>

        <Menu.Divider />

        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
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
