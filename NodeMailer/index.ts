import nodemailer from "nodemailer"
import { google } from "googleapis"
import SMTPTransport from "nodemailer/lib/smtp-transport"

process.env.NODE_ENV !== "production" &&
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config()

const OAuth2 = google.auth.OAuth2

const createTransporter = async (): Promise<
  nodemailer.Transporter<SMTPTransport.SentMessageInfo>
> => {
  const oauth2Client = new OAuth2(
    process.env.NODEMAILER_CLIENT_ID,
    process.env.NODEMAILER_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.NODEMAILER_REFRESH_TOKEN,
  })

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject()
      }
      resolve(token)
    })
  })

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: process.env.NODEMAILER_USER,
      clientId: process.env.NODEMAILER_CLIENT_ID,
      clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
      refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
      accessToken,
    },
  } as SMTPTransport.Options)

  return transporter
}

export const sender = process.env.NODE_MAILER_SENDER

export default createTransporter
