import Head from "next/head"
import React, { Suspense } from "react"
import { ErrorBoundary, Routes } from "@blitzjs/next"
import { AppShell, Header, Text, Footer, Anchor, Button, Loader } from "@mantine/core"
import { Horizontal, Vertical } from "mantine-layout-components"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import RootErrorFallback from "../components/RootErrorFallback"
import { useRouter } from "next/router"

const Layout: React.FC<{
  title?: string
  children: React.ReactNode
}> = ({ title, children }) => {
  const [logoutMutation] = useMutation(logout)
  const thisYear = new Date().getFullYear()

  const router = useRouter()
  const user = useCurrentUser()

  return (
    <>
      <Head>
        <title>{title || "eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        padding="md"
        // navbar={<Navbar width={{ base: 300 }} height={500} p="xs"></Navbar>}
        header={
          <Header height={55} p="xs">
            <Horizontal fullH spaceBetween>
              <Anchor
                underline={false}
                color="gray.3"
                component={Link}
                href={Routes.Home()}
                fw="bold"
              >
                Eventio{" "}
              </Anchor>
              {user && (
                <Horizontal>
                  <Link href={Routes.EditProfilePage()}>
                    <Text>{user.name}</Text>
                  </Link>
                  <Button
                    size="xs"
                    variant="light"
                    onClick={async () => {
                      await logoutMutation()
                      router.push(Routes.Home())
                    }}
                  >
                    Logout
                  </Button>
                </Horizontal>
              )}
            </Horizontal>
          </Header>
        }
        footer={
          <Footer height={45} p="xs">
            <Horizontal fullH>
              <Horizontal fullH fullW center>
                <Text fz="xs" color="dimmed">
                  copyright {thisYear}
                </Text>
              </Horizontal>
            </Horizontal>
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        <Vertical fullH fullW>
          <ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>
            <Suspense
              fallback={
                <Vertical center fullH fullW>
                  <Loader />
                </Vertical>
              }
            >
              {children}
            </Suspense>
          </ErrorBoundary>
        </Vertical>
      </AppShell>
    </>
  )
}

export default Layout
