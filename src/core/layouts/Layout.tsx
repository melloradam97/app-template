import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { AppShell, Navbar, Header, Text, Footer } from "@mantine/core"
import { Horizontal } from "mantine-layout-components"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const thisYear = new Date().getFullYear()

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
          <Header height={45} p="xs">
            <Horizontal fullH>
              <Text fw="bold">eventio </Text>
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
        <Suspense fallback="Loading...">{children}</Suspense>
      </AppShell>
    </>
  )
}

export default Layout
