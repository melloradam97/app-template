import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "@/core/components/MainAuthenticationForm/Index"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Vertical } from "mantine-layout-components"
import { Text } from "@mantine/core"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()

  return (
    <Layout title="Home">
      {!currentUser && <AuthenticationForm />}
      {currentUser && (
        <Vertical center fullH fullW>
          <Text>
            A starter template with auth, email and profile editing logic already baked in!
          </Text>
        </Vertical>
      )}
    </Layout>
  )
}

export default Home
