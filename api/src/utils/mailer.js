/* eslint-disable import/prefer-default-export */
import nodemailer from "nodemailer"

const from = '"Wormbooks" <info@wormbooks.com>'

function setup() {
  const transport = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }
  return nodemailer.createTransport(transport)
}

export function sendConfirmationEmail(user) {
  const transporter = setup()
  const email = {
    from,
    to: user.email,
    subject: "Welcome to WormBooks",
    text: `
      Welcome to WormBooks. Please, confirm your e-mail.

      ${user.generateConfirmationURL()}
    `,
  }

  transporter.sendMail(email).then(info => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("SEND_MAIL -> Message sent", info.messageId)
    }
  })
}

export function sendResetPasswordEmail(user) {
  const transporter = setup()

  const email = {
    from,
    to: user.email,
    subject: "WormBooks - Reset Password",
    text: `
      To reset password follow this link.

      ${user.generateResetPasswordURL()}
    `,
  }

  transporter.sendMail(email).then(info => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("SEND_MAIL -> Message sent", info.messageId)
    }
  })
}
