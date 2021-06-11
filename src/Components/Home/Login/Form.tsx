import axios from "axios"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useAccess } from "../../../Providers/AccessProvider"

const Form: React.FC = () => {
  const loginURL = "http://localhost:5000/login"

  const { setAccess } = useAccess()

  const [input, setInput] = useState<{
    username_email: string
    password: string
  }>({
    username_email: "",
    password: "",
  })
  const [error, setError] =
    useState<{
      type: "username" | "password"
      info: string
    } | null>(null)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(input => ({ ...input, [e.target.name]: e.target.value }))
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.post<{ success: boolean; username: string }>(
        loginURL,
        {
          username: input.username_email.trim(),
          password: input.password.trim(),
        },
        { withCredentials: true }
      )
      if (res.data.success)
        setAccess({ loggedIn: true, username: res.data.username })
    } catch (err) {
      console.log(err.response.data)
      setError(err.response.data)
    }
  }

  useEffect(() => {
    if (error) {
      if (error.type === "password")
        setInput(input => ({ ...input, password: "" }))
      else if (error.type === "username")
        setInput(input => ({ username_email: "", password: "" }))
    }
  }, [error])

  return (
    <StyledForm onSubmit={submitHandler}>
      <div className="inputContainer">
        <label htmlFor="username_email">Username/Email</label>
        <div>
          <p className="errorMessage">
            {error && error.type === "username" ? error.info : ""}
          </p>
          <input
            type="text"
            name="username_email"
            autoFocus
            required
            value={input.username_email}
            onChange={changeHandler}
            className={error && error.type === "username" ? "error" : ""}
          />
        </div>
      </div>
      <div className="inputContainer">
        <label htmlFor="password">Password</label>{" "}
        <div>
          <p className="errorMessage">
            {error && error.type === "password" ? error.info : ""}
          </p>
          <input
            type="password"
            name="password"
            required
            value={input.password}
            onChange={changeHandler}
            className={error && error.type === "password" ? "error" : ""}
          />
        </div>
      </div>

      <button>Login</button>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  position: relative;
  width: 100%;
  padding: 0 var(--padding) 0 calc(var(--padding) * 1.5);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  font-family: var(--fontContent);
  font-size: 1rem;
  color: #000;

  z-index: 2;
  .inputContainer {
    width: 100%;

    label {
      font-size: 1.75em;
    }

    .errorMessage {
      color: red;
      line-height: 1;
      height: 0.8em;
      font-size: 0.8em;
      font-weight: 300;
    }

    div {
      margin: 0.5em 0 1em 0;
    }

    input {
      width: 100%;
      background: #ececec;
      color: #383838;
      border-radius: 5px;

      padding: 0.5em;
      font-size: 1.15em;

      margin-top: 0.5em;
      transition: box-shadow 0.3s;
    }

    .error {
      box-shadow: inset 1px 1px 5px rgba(255, 0, 0, 0.05),
        inset -1px -1px 5px rgba(255, 0, 0, 0.05);
    }
  }

  button {
    align-self: flex-start;
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
