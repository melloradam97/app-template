import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(resolver.authorize(), async (_, { session: { userId } }) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      onboarded: true,
    },
  })
})
