import styled from "@emotion/styled"
import { forgotPassword } from "API_Endpoints"
import axios from "axios"
import React from "react"
import { useState } from "react"

const Form = () => {
  const [input, setInput] = useState("")

  const [message, setMessage] = useState("")

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage("")
    try {
      const res = await axios[forgotPassword.METHOD]<{
        success: boolean
        message: string
      }>(forgotPassword.URL, {
        email: input,
      })
      setMessage(res.data.message)
    } catch (err: any) {
      console.log(err)
      if (err.response && err.response.status && err.response.status === 404)
        setMessage(err.response.data.message)
      else setMessage("We encountered an Error. Please try again later.")
    }
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <p className="err">{message}</p>
      <label htmlFor="email">Enter your Username or Email</label>
      <input
        value={input}
        onChange={changeHandler}
        type="text"
        required
        autoFocus
      />
      <button>Send Reset Link</button>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  width: 60%;

  align-self: center;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: start;

  > * {
    margin-top: 0.75em;
  }

  p {
    font-size: 0.9em;
    opacity: 0.8;
  }

  .err {
    line-height: 1;
    height: 0.75em;
    color: red;
    font-size: 0.75em;
  }

  .success {
    line-height: 1;
    height: 0.75em;
    color: darkgreen;
    font-size: 0.75em;
  }

  label {
    font-size: clamp(1em, 2vw, 1.1em);
    font-weight: 500;
  }
  input {
    width: 100%;
    font-size: clamp(0.9em, 3vw, 1em);
    padding: 0.3em;
    opacity: 0.9;
    border-radius: 5px;
    border: 1px solid #464977;
  }
  button {
    background: #4d4476;
    color: #fff;
    border-radius: 5px;

    padding: clamp(0.3em, 2vw, 0.6em) clamp(1em, 3vw, 1.2em);
    font-size: clamp(0.8em, 2vw, 0.9em);

    font-weight: 500;
  }

  @media only screen and (max-width: 500px) {
    width: 80%;

    > * {
      margin: 1em 0;
    }

    button {
      margin-top: 1em;
    }
  }
`

export default Form
