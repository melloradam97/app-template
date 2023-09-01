import { ErrorFallbackProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import { AuthenticationForm } from "./MainAuthenticationForm/Index"
import { Vertical } from "mantine-layout-components"
import { Paper, Text } from "@mantine/core"

const ErrorComponent: React.FC<{ statusCode: string | number; title: string }> = ({
  statusCode,
  title,
}) => {
  return (
    <Vertical center fullW>
      <Paper p="xl" w="100%" maw={400} radius="md">
        <Vertical fullW center spacing="0">
          <Text color="dimmed" fz="md" fw="bold">
            {statusCode}
          </Text>
          <Text fz="xl">An error occurred</Text>
          <Text fz="md" color="dimmed">
            {title}
          </Text>
        </Vertical>
      </Paper>
    </Vertical>
  )
}

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <AuthenticationForm />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

export default RootErrorFallback
