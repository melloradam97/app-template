import { z } from "zod"
import { name } from "../auth/schemas"

export const UpdateProfileInput = z.object({
  name: name,
  bio: z.string().optional(),
  username: z.string().optional(),
  avatarImageKey: z.string().optional(),
  coverImageKey: z.string().optional(),
})

export type UpdateProfileInputType = z.infer<typeof UpdateProfileInput>
