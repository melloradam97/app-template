import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateProfileInput } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateProfileInput),
  resolver.authorize(),
  async (Input, { session: { userId } }) => {
    const user = await db.user.findFirst({
      where: {
        username: Input.username,
      },
    })

    if (user && user.id !== userId) {
      throw new Error("Username is already taken")
    } else {
      await db.user.update({
        where: {
          id: userId,
        },
        data: Input,
      })
    }
  }
)
