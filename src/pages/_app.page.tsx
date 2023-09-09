import FullPageLoader from "@/core/components/FullPageLoader"
import RootErrorFallback from "@/core/components/RootErrorFallback"
import { globalModals } from "@/modals"
import { theme } from "@/styles/mantine-theme"
import { ErrorBoundary, AppProps } from "@blitzjs/next"
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ ...theme, colorScheme }}>
        <Notifications />
        <ModalsProvider modals={globalModals}>
          <ErrorBoundary FallbackComponent={RootErrorFallback}>
            <Suspense fallback={<FullPageLoader />}>
              <Component {...pageProps} />
            </Suspense>
          </ErrorBoundary>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default withBlitz(MyApp)
