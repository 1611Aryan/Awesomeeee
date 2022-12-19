import createTransporter, { sender } from "../NodeMailer/index.js"
import { CLIENT_URL } from "../Utilities/Endpoints.js"

const sendVerificationEmail = async (
  email: string,
  token: string
): Promise<void> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const options = {
      from: sender,
      to: email,
      subject: "Password Reset - Messenger",
      html: `<body><h1>Verification Code</h1><p>${CLIENT_URL}/changePassword?token=${token}</p></body>`,
    }

    const transporter = await createTransporter()
    await transporter.sendMail(options)
    transporter.close()
  } catch (err) {
    throw err
  }
}

export default sendVerificationEmail
