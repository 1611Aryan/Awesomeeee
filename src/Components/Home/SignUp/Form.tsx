import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { signUpEndpoint } from "../../../API_Endpoints"

const Form: React.FC = () => {
  const [input, setInput] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  })

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<{ type: "email"; info: string } | null>(
    null
  )
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(input => ({ ...input, [e.target.name]: e.target.value }))
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios[signUpEndpoint.METHOD](signUpEndpoint.URL, {
        email: input.email.trim(),
        password: input.password.trim(),
      })

      if (res.data) {
        setSuccess(true)
        setError(null)
      }
    } catch (err) {
      setSuccess(false)
      setError(err.response.data)
      console.log(err.response.data)
    } finally {
      setInput({ email: "", password: "" })
    }
  }

  return (
    <StyledForm onSubmit={submitHandler}>
      <div className="infoMessage">
        {success && (
          <p className="successInfo">
            Account Created Successfully. <Link to="/">Login</Link> to continue
          </p>
        )}
        <p className="errorInfo">{error && error.info}</p>
      </div>
      <div className="inputContainer">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          required
          onChange={changeHandler}
          autoFocus
          value={input.email}
          name="email"
          className={error && error.type === "email" ? "error" : ""}
        />
      </div>
      <div className="inputContainer">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          value={input.password}
          onChange={changeHandler}
          name="password"
        />
      </div>
      <button>Sign Up</button>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  width: 100%;
  padding: 0 var(--padding);

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  font-family: var(--fontContent);

  z-index: 5;

  .infoMessage {
    height: 0.9em;
  }

  .successInfo {
    line-height: 1;
    font-size: 0.9em;
    font-weight: 300;
    a {
      font-size: 1.05em;
      text-decoration: underline;
      color: #4d4476;
      font-weight: 500;
    }
  }
  .errorInfo {
    line-height: 1;
    color: red;
    font-size: 0.9em;
  }
  .inputContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 1em 0;

    .error {
      box-shadow: inset 1px 1px 5px rgba(255, 0, 0, 0.05),
        inset -1px -1px 5px rgba(255, 0, 0, 0.05);
    }
  }

  label {
    font-size: 1.75em;
  }

  input {
    width: 60%;
    background: #ececec;
    border-radius: 5px;

    padding: 0.4em 0.5em;
    font-size: 1.25em;
  }

  button {
    background: #4d4476;
    color: #fff;
    border-radius: 5px;

    padding: 0.5em 1em;
    font-size: 1.25em;
    font-family: var(--fontHeading);
    letter-spacing: 1px;
    font-weight: 500;
  }
`

export default Form
