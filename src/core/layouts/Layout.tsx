import Head from "next/head"
import React, { Suspense } from "react"
import { ErrorBoundary, Routes } from "@blitzjs/next"
import { AppShell, Header, Text, Footer, Anchor, Loader, Modal } from "@mantine/core"
import { Horizontal, Vertical } from "mantine-layout-components"
import Link from "next/link"

import { useCurrentUser } from "@/features/users/hooks/useCurrentUser"
import RootErrorFallback from "../components/RootErrorFallback"
import UserProfileProgress from "../components/Header/UserProfileProgress"
import OnboardingWizard from "../components/OnboardingWizard"
import UserHeaderMenu from "../components/Header/UserHeaderMenu"
import { APP_NAME } from "@/config"

const Layout: React.FC<{
  title?: string
  children: React.ReactNode
}> = ({ title, children }) => {
  const thisYear = new Date().getFullYear()
  const user = useCurrentUser()

  return (
    <>
      <Head>
        <title>{title || "APP NAME"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        padding="md"
        header={
          <Header height={55} p="xs">
            <Horizontal fullH spaceBetween>
              <Anchor underline={false} component={Link} href={Routes.Home()} fw="bold">
                {APP_NAME}
              </Anchor>
              {user && (
                <Horizontal>
                  <UserHeaderMenu user={user} />
                  <UserProfileProgress />
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
                title={`Welcome to ${APP_NAME}`}
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
