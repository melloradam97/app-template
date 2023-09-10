import { useState } from "react"
import { Stepper, Button, Group } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import markUserOnboarded from "@/features/users/mutations/markUserOnboarded"

function OnboardingWizard() {
  const [active, setActive] = useState(1)
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  const [$markUserOnboarded, { isLoading }] = useMutation(markUserOnboarded)

  const isFinalStep = active === 3

  return (
    <>
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step" description="Create an account">
          Create an account (we think you may have done this already!)
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Next you'll want to verify your email. You should have one already but if you need to send
          it again you can do that on your profile page. Make sure to check your spam folder!
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          After that you're good to go! You'll have full access to the site.
        </Stepper.Step>
        <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button
          loading={isLoading}
          onClick={() => {
            if (isFinalStep) {
              $markUserOnboarded()
            } else {
              nextStep()
            }
          }}
        >
          {isFinalStep ? "Finish" : "Next"}
        </Button>
      </Group>
    </>
  )
}

export default OnboardingWizard
