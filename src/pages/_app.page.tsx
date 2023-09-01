import FullPageLoader from "@/core/components/FullPageLoader"
import RootErrorFallback from "@/core/components/RootErrorFallback"
import { ErrorBoundary, AppProps } from "@blitzjs/next"
import { Loader, MantineProvider } from "@mantine/core"
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
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Suspense fallback={<FullPageLoader />}>
          <Component {...pageProps} />
        </Suspense>
      </ErrorBoundary>
    </MantineProvider>
  )
}

export default withBlitz(MyApp)
