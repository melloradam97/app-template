import { useState } from "react"
import { ActionIcon, FileInput, Indicator, Tooltip, Text, Loader, Image } from "@mantine/core"
import { IconPhoto, IconX } from "@tabler/icons-react"
import { Horizontal, Vertical } from "mantine-layout-components"
import { useUploadThing } from "./UploadThing"
import { showNotification } from "@mantine/notifications"
import { UseFormReturnType } from "@mantine/form"
import { getUploadthingUrl } from "@/utils/image-utils"

const UploadThingFileInput: React.FC<{
  form: UseFormReturnType<any>
  name: string
  label: string
}> = ({ form, name, label }) => {
  const [loading, setLoading] = useState(false)
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (files) => {
      setLoading(false)
      const fileKey = files?.[0]?.key
      if (fileKey) {
        form.setFieldValue(name, fileKey)
      }
    },
    onUploadError: () => {
      setLoading(false)
      showNotification({
        title: "Error",
        message: "Error uploading file",
        color: "red",
      })
    },
  })

  const existingImageKey = form.values[name]

  return (
    <Vertical>
      <Horizontal spacing="xs" center>
        <Text size="sm" weight={500}>
          {label}
        </Text>
        {loading && <Loader size="xs" />}
      </Horizontal>

      {existingImageKey && (
        <Indicator
          color="none"
          label={
            <Tooltip label="Clear image" color="dark">
              <ActionIcon onClick={() => form.setFieldValue(name, "")} variant="light" size="xs">
                <IconX size={16} />
              </ActionIcon>
            </Tooltip>
          }
        >
          <Image radius="sm" width="60px" src={getUploadthingUrl(existingImageKey)} />
        </Indicator>
      )}

      {!existingImageKey && (
        <FileInput
          placeholder={label}
          disabled={loading}
          onChange={(files) => {
            setLoading(true)
            if (files) {
              startUpload([files])
            }
          }}
          clearable={true}
          icon={<IconPhoto size={16} />}
        />
      )}
    </Vertical>
  )
}

export default UploadThingFileInput
