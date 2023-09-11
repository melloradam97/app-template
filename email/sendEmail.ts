import { isDev } from "@/config"
import { Resend } from "resend"
import { nodemailerAppTransport } from "./transports/nodemailer-local-app-transport"
import { render } from "@react-email/render"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({ to, subject, react }) => {
  let message = {
    from: "home@APP_NAME.dev",
    to,
    subject,
  }

  if (isDev) {
    const html = render(react)
    return nodemailerAppTransport.sendMail({
      ...message,
      html,
    })
  } else {
    return resend.emails.send({
      ...message,
      react,
    })
  }
}
