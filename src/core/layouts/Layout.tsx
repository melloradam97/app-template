import Head from "next/head"
import React, { Suspense } from "react"
import { ErrorBoundary, Routes } from "@blitzjs/next"
import { AppShell, Header, Text, Footer, Anchor, Button, Loader, Modal, Badge } from "@mantine/core"
import { Horizontal, Vertical } from "mantine-layout-components"
import Link from "next/link"
import { useMutation } from "@blitzjs/rpc"
import logout from "@/features/auth/mutations/logout"
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import RootErrorFallback from "../components/RootErrorFallback"
import { useRouter } from "next/router"
import Conditional from "conditional-wrap"
import UserAvatar from "../components/UserAvatar"
import UserProfileProgress from "../components/Header/UserProfileProgress"
import OnboardingWizard from "../components/OnboardingWizard"
import { openContextModal } from "@mantine/modals"
import { GlobalModal } from "@/modals"
import DarkLightToggle from "../components/DarkLightToggle"
import UserHeaderMenu from "../components/Header/UserHeaderMenu"

const Layout: React.FC<{
  title?: string
  children: React.ReactNode
}> = ({ title, children }) => {
  const thisYear = new Date().getFullYear()
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
              <Anchor underline={false} component={Link} href={Routes.Home()} fw="bold">
                Eventio{" "}
              </Anchor>
              {user && (
                <Horizontal>
                  <UserHeaderMenu user={user} />

                  <Badge
                    onClick={() => {
                      openContextModal({
                        modal: GlobalModal.becomePro,
                        title: "Become pro",
                        innerProps: {
                          price: 95,
                        },
                      })
                    }}
                    color="red"
                  >
                    Pro
                  </Badge>
                  <UserProfileProgress />

                  {/* <DarkLightToggle /> */}
                </Horizontal>
              )}
            </Horizontal>
          </Header>
        }
        footer={
          <Footer height={45} p="xs">
            <Horizontal fullH>
              <Horizontal fullH fullW center>
                <Text fz="xs">copyright {thisYear}</Text>
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
              <Modal
                size="xl"
                centered={true}
                closeOnClickOutside={false}
                closeOnEscape={false}
                withCloseButton={false}
                title="Onboarding modal"
                opened={!!user && !user?.onboarded}
                onClose={() => {}}
              >
                <OnboardingWizard />
              </Modal>
              {children}
            </Suspense>
          </ErrorBoundary>
        </Vertical>
      </AppShell>
    </>
  )
}

export default Layout
