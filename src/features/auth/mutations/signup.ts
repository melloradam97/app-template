import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { SignupInput } from "../schemas"
import { PrismaError } from "@/utils/blitz-utils"

export default resolver.pipe(resolver.zod(SignupInput), async ({ email, password, name }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())

  try {
    const user = await db.user.create({
      data: { email: email.toLowerCase().trim(), hashedPassword, name, role: "USER" },
      select: { id: true, name: true, email: true, role: true },
    })

    if (user) {
      await ctx.session.$create({ userId: user.id, role: user.role as Role })
      return user
    }
  } catch (err) {
    throw new PrismaError(err.message, err.code, err.meta)
  }

  return null
})
