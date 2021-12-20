import { signUpEndpoint } from "API_Endpoints"
import axios from "axios"

export type input = { email: string; password: string }
export type error = { type: "email" | "oauth"; info: string } | null

export const signup = async (input: input) => {
  try {
    await axios[signUpEndpoint.METHOD](signUpEndpoint.URL, {
      email: input.email.trim(),
      password: input.password.trim(),
    })
  } catch (err: any) {
    throw err
  }
}
