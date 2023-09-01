import { Loader } from "@mantine/core"
import { Vertical } from "mantine-layout-components"

const FullPageLoader = () => {
  return (
    <Vertical mih="100vh" center fullH fullW>
      <Loader />
    </Vertical>
  )
}

export default FullPageLoader
