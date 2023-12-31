import { resolver } from "@blitzjs/rpc"
import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const Input = z.object({
  username: z.string(),
})

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ username }) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      avatarImageKey: true,
    },
  })

  if (!user) throw new NotFoundError("User not found")

  return user
})
