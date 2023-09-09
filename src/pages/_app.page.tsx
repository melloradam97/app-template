import FullPageLoader from "@/core/components/FullPageLoader"
import RootErrorFallback from "@/core/components/RootErrorFallback"
import { globalModals } from "@/modals"
import { ErrorBoundary, AppProps } from "@blitzjs/next"
import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <Notifications />
      <ModalsProvider modals={globalModals}>
        <ErrorBoundary FallbackComponent={RootErrorFallback}>
          <Suspense fallback={<FullPageLoader />}>
            <Component {...pageProps} />
          </Suspense>
        </ErrorBoundary>
      </ModalsProvider>
    </MantineProvider>
  )
}

export default withBlitz(MyApp)
