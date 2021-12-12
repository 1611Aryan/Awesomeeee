import { forgotPassword_step2 } from "API_Endpoints"
import axios from "axios"
import { useState } from "react"

const Step2: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>
  email: string
}> = ({ setStep, email }) => {
  const [input, setInput] = useState("")
  const [message, setMessage] = useState("")

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage("")
    try {
      const res = await axios[forgotPassword_step2.METHOD]<{
        success: boolean
        message: string
      }>(
        forgotPassword_step2.URL,
        {
          email,
          code: input,
        },
        {
          withCredentials: true,
        }
      )
      if (res.data.success) setStep(3)
    } catch (err: any) {
      console.log(err.response.status)
      if (err.response && err.response.status && err.response.status === 404)
        setMessage(err.response.data.message)
      else setMessage("We encountered an Error. Please try again later.")
    }
  }
  return (
    <div className="main">
      <form onSubmit={submitHandler}>
        <p className="err">{message}</p>
        <p>
          A verification code was sent to your registered email. The code will
          expire in <strong>5 minutes</strong>.
        </p>

        <label htmlFor="code">Verification Code</label>
        <input
          type="text"
          value={input}
          onChange={changeHandler}
          name="code"
          required
          autoFocus
        />

        <button>Next</button>
      </form>
    </div>
  )
}

export default Step2
