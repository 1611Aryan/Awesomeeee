import { forgotPassword_step3 } from "API_Endpoints"
import axios from "axios"
import { useState } from "react"

const Step3: React.FC<{ email: string }> = ({ email }) => {
  const [input, setInput] = useState("")
  const [message, setMessage] = useState<{
    type: "err" | "success" | ""
    message: string
  }>({
    type: "",
    message: "",
  })

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage({
      type: "",
      message: "",
    })
    if (email)
      try {
        const res = await axios[forgotPassword_step3.METHOD]<{
          success: boolean
          message: string
        }>(
          forgotPassword_step3.URL,
          {
            email,
            newPassword: input,
          },
          {
            withCredentials: true,
          }
        )
        if (res.data.success)
          setMessage({
            type: "success",
            message: "Password Changed",
          })
      } catch (err: any) {
        console.log(err)

        if (err.response && err.response.status && err.response.status === 404)
          setMessage(err.response.data.message)
        else
          setMessage({
            type: "err",
            message: "We encountered an Error. Please try again later.",
          })
      }
  }

  return (
    <div className="main">
      <form onSubmit={submitHandler}>
        <p className={message.type}>{message.message}</p>
        <p>
          Now choose a <strong>strong</strong> password
        </p>

        <label htmlFor="password">New Password</label>
        <input
          value={input}
          onChange={changeHandler}
          type="password"
          name="password"
          required
          readOnly={message.type === "success"}
          autoFocus
        />

        <button>Change</button>
      </form>
    </div>
  )
}

export default Step3
