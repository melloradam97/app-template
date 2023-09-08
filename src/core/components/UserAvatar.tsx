import { getAvatarFallbackName, getUploadthingUrl } from "@/utils/image-utils"
import { Avatar, AvatarProps } from "@mantine/core"

type Props = {
  avatarImageKey?: string | null
  name?: string | null
} & Partial<AvatarProps>

const UserAvatar: React.FC<Props> = ({ avatarImageKey, name, ...rest }) => {
  return (
    <Avatar src={getUploadthingUrl(avatarImageKey)} radius="xl" {...rest}>
      {getAvatarFallbackName(name)}
    </Avatar>
  )
}

export default UserAvatar
