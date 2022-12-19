import createTransporter, { sender } from "../NodeMailer/index.js"

const sendSignupEmail = async (email: string): Promise<void> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const options = {
      from: sender,
      to: email,
      subject: "Welcome to  Messenger",
      html: `<body><h1>Account Created Successfully</h1></body>`,
    }

    const transporter = await createTransporter()
    await transporter.sendMail(options)
    transporter.close()
  } catch (err) {
    throw err
  }
}

export default sendSignupEmail
