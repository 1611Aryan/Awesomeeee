import { loginEndpoint } from "API_Endpoints"
import axios from "axios"

export type input = {
  username_email: string
  password: string
}

export type error = {
  type: "username" | "password"
  info: string
} | null

export const login = async (input: input) => {
  type payload = {
    success: boolean
    username: string
  }

  try {
    const res = await axios[loginEndpoint.METHOD]<payload>(
      loginEndpoint.URL,
      {
        username: input.username_email.trim(),
        password: input.password.trim(),
      },
      { withCredentials: true }
    )

    if (!res.data.success) throw new Error("Invalid Credentials")

    return res.data.username
  } catch (err: any) {
    throw err
  }
}
