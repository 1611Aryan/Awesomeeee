import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAccess } from "Providers/AccessProvider"

import { loginEndpoint } from "API_Endpoints"
import OAuth from "./OAuth"
import styled from "styled-components"

type payload = {
  success: boolean
  username: string
}

const Form: React.FC = () => {
  const [input, setInput] = useState<{
    username_email: string
    password: string
  }>({
    username_email: "",
    password: "",
  })
  const [error, setError] = useState<{
    type: "username" | "password"
    info: string
  } | null>(null)

  const { setAccess } = useAccess()

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(input => ({ ...input, [e.target.name]: e.target.value }))
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios[loginEndpoint.METHOD]<payload>(
        loginEndpoint.URL,
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
        setInput({ username_email: "", password: "" })
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

      <div className="buttons">
        <button>Login</button>
        <span>
          <Link to="/">Forgot Password?</Link>
        </span>
      </div>

      <OAuth />
    </StyledForm>
  )
}

const StyledForm = styled.form`
  position: relative;
  width: 90%;
  padding: 0 var(--padding) 0 calc(var(--padding) * 1.25);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  font-family: var(--fontContent);
  color: var(--primary);

  z-index: 2;
  .inputContainer {
    width: 100%;

    label {
      font-size: clamp(1em, 4vw, 1.5em);
    }

    .errorMessage {
      color: red;
      line-height: 1;
      height: clamp(0.6em, 1vw, 0.9em);
      font-size: clamp(0.6em, 1vw, 0.8em);
      font-weight: 300;
      margin: 0.1em 0;
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
      font-size: clamp(0.8em, 3vw, 1em);

      margin-top: 0.25em;
      transition: box-shadow 0.3s;
    }

    .error {
      border: 1px solid rgba(255, 0, 0, 0.2);
    }
  }

  .buttons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      align-self: flex-start;
      background: #4d4476;
      color: #fff;
      border-radius: 5px;

      padding: clamp(0.3em, 2vw, 0.6em) 1.5em;
      font-size: clamp(0.8em, 3vw, 1em);

      font-weight: 500;
    }
    span {
      display: inline-block;
      padding: 0.3em 0;
      font-size: clamp(0.7em, 3vw, 0.9em);
      transition: color ease-out 100ms;
      cursor: pointer;
      &:hover {
        color: #bcb243;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .inputContainer {
      label {
        text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
      }
      input {
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
      }
      .error {
        border: 1px solid rgba(255, 0, 0, 0.1);
      }
    }
  }
`

export default Form
