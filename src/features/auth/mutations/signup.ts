import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { SignupInput } from "../schemas"
import { PrismaError } from "@/utils/blitz-utils"
import { sendEmail } from "email/sendEmail"
import React from "react"
import Welcome from "email/react-email/emails/welcome"
import { getEmailVerifyLink } from "./sendVerificationEmail"

export default resolver.pipe(resolver.zod(SignupInput), async ({ email, password, name }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())

  try {
    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        hashedPassword,
        name,
        role: "USER",
        onboarded: false,
      },
      select: { id: true, name: true, email: true, role: true },
    })

    if (user) {
      const emailVerifyUrl = await getEmailVerifyLink({
        userId: user.id,
        userEmail: user.email,
      })
      await sendEmail({
        to: user.email,
        subject: "Welcome to Eventio",
        react: React.createElement(Welcome, {
          props: {
            name: user.name,
            emailVerifyUrl,
          },
        }),
      })
      await ctx.session.$create({ userId: user.id, role: user.role as Role })
      return user
    }
  } catch (err) {
    throw new PrismaError(err.message, err.code, err.meta)
  }

  return null
})
