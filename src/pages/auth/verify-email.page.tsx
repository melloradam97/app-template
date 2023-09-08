import Layout from "@/core/layouts/Layout"
import verifyEmailToken from "@/features/auth/queries/verifyEmailToken"
import { useStringQueryParam } from "@/utils/utils"
import { BlitzPage } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Text } from "@mantine/core"
import { Vertical } from "mantine-layout-components"

const VerifyEmailPage: BlitzPage = () => {
  const token = useStringQueryParam("token")

  const [result, { isSuccess, error }] = useQuery(
    verifyEmailToken,
    {
      token: token as any,
    },
    {
      enabled: !!token,
    }
  )

  return (
    <Layout title="Verify Your Email">
      <Vertical>
        <>
          {result && isSuccess && <Text>Email verified!</Text>}
          {error && <Text>Error with token</Text>}
        </>
      </Vertical>
    </Layout>
  )
}

export default VerifyEmailPage
