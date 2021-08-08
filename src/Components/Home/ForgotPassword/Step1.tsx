import { forgotPassword_step1 } from "API_Endpoints"
import axios from "axios"
import React from "react"
import { useState } from "react"

const Step1: React.FC<{
  setStep: React.Dispatch<React.SetStateAction<number>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
}> = ({ setStep, setEmail }) => {
  const [input, setInput] = useState("")

  const [message, setMessage] = useState("")

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage("")
    try {
      const res = await axios[forgotPassword_step1.METHOD]<{
        success: boolean
        message: string
      }>(forgotPassword_step1.URL, {
        email: input,
      })
      setEmail(input)
      if (res.data.success) setStep(2)
    } catch (err) {
      console.log(err)
      if (err.response && err.response.status && err.response.status === 404)
        setMessage(err.response.data.message)
      else setMessage("We encountered an Error. Please try again later.")
    }
  }

  return (
    <div className="main">
      <form onSubmit={submitHandler}>
        <p className="err">{message}</p>
        <label htmlFor="email">Enter your Username or Email</label>
        <input
          value={input}
          onChange={changeHandler}
          type="text"
          required
          autoFocus
        />
        <button>Next</button>
      </form>
    </div>
  )
}

export default Step1
