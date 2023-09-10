import Layout from "@/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Tabs } from "@mantine/core"
import { IconMail, IconSettings, IconUser } from "@tabler/icons-react"
import { Vertical } from "mantine-layout-components"
import ChangePassword from "./components/ChangePassword"

const SettingsPage: BlitzPage = () => {
  return (
    <Layout title="Settings">
      <Vertical fullW>
        <Tabs w="100%" orientation="vertical" defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="account" icon={<IconUser size="0.8rem" />}>
              Account
            </Tabs.Tab>
            <Tabs.Tab value="email" icon={<IconMail size="0.8rem" />}>
              Email
            </Tabs.Tab>
            <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="account" pl="xs">
            <ChangePassword />
          </Tabs.Panel>

          <Tabs.Panel value="email" pl="xs">
            Email
          </Tabs.Panel>

          <Tabs.Panel value="settings" pl="xs">
            Settings
          </Tabs.Panel>
        </Tabs>
      </Vertical>
    </Layout>
  )
}

export default SettingsPage
