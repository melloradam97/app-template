import { Menu, Text } from "@mantine/core"
import { HelpTooltipCircle } from "./HelpTooltipCircle"
import { Horizontal } from "mantine-layout-components"
import { useRouter } from "next/router"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import Conditional from "conditional-wrap"
import NextLink from "next/link"

let ITEM_FONT_SIZE = 14
let ICON_SIZE = 16

export const MenuItemLink = ({ Icon, href, ...rest }) => {
  return (
    <Menu.Item
      sx={{
        fontSize: ITEM_FONT_SIZE,
      }}
      component={NextLink}
      href={href}
      icon={<Icon size={ICON_SIZE} stroke={1.5} />}
      {...rest}
    />
  )
}

export const MenuItemEdit = ({ href, children = "Edit" }) => {
  return (
    <MenuItemLink Icon={IconPencil} href={href}>
      {children}
    </MenuItemLink>
  )
}

export const MenuItemDelete: React.FC<{
  onClick: any
  confirm?: boolean
  redirect?: any
}> = ({ onClick, redirect, confirm = true }) => {
  const { push } = useRouter()

  let del = async () => {
    await onClick()
    if (redirect) {
      push?.(redirect)
    }
  }

  return (
    <MenuItemIcon
      Icon={IconTrash}
      // onClick={(e) => {
      //     e.preventDefault();
      //     e.stopPropagation();
      //     confirm ? confirmDelete(del) : del();
      // }}
      sx={(t) => ({
        color: t.colors.red[3],
        fontSize: ITEM_FONT_SIZE,
      })}
    >
      Delete
    </MenuItemIcon>
  )
}

export const MenuItemIcon = ({ Icon, children, tooltip = "", ...rest }) => {
  const childrenWithTooltip = (
    <Conditional
      condition={!!tooltip}
      wrap={(c) => (
        <Horizontal fullW>
          <Text>{c}</Text>
          <HelpTooltipCircle tooltip={tooltip} />
        </Horizontal>
      )}
    >
      {children}
    </Conditional>
  )

  return (
    <Menu.Item
      sx={{
        fontSize: ITEM_FONT_SIZE,
      }}
      icon={<Icon size={ICON_SIZE} stroke={1.5} />}
      {...rest}
    >
      {childrenWithTooltip}
    </Menu.Item>
  )
}
