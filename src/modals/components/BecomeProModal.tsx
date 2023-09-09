import { Button } from "@mantine/core"
import { ContextModalProps } from "@mantine/modals"
import { Horizontal, Vertical } from "mantine-layout-components"

type InnerProps = {
  price: number
}

const BecomeProModal: React.FC<ContextModalProps<InnerProps>> = ({ context, id, innerProps }) => {
  const { price } = innerProps

  const handleCloseModal = () => context.closeModal(id)

  return (
    <Vertical fullW spacing={15}>
      <Vertical>You can purchase pro for ${price}</Vertical>
      <Horizontal fullW spaceBetween>
        <Button color="gray" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("submit")
          }}
        >
          Submit
        </Button>
      </Horizontal>
    </Vertical>
  )
}

export default BecomeProModal
