import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "@/core/components/MainAuthenticationForm/Index"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import { Vertical } from "mantine-layout-components"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()
  return <Layout title="Home">{!currentUser && <AuthenticationForm />}</Layout>
}

export default Home
