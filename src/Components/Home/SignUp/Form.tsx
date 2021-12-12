import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { signUpEndpoint } from "API_Endpoints"

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
    } catch (err: any) {
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
    line-height: 1;
    height: clamp(0.6em, 1vw, 0.8em);
    font-size: clamp(0.6em, 1vw, 0.8em);
  }

  .successInfo {
    line-height: 1;
    height: clamp(0.8em, 2vw, 1em);
    font-size: clamp(0.8em, 2vw, 1em);
    font-weight: 400;
    a {
      font-size: 1.05em;
      text-decoration: underline;
      color: #4d4476;
      font-weight: 700;
    }
  }
  .errorInfo {
    line-height: 1;
    color: red;
    height: clamp(0.6em, 1vw, 0.8em);
    font-size: clamp(0.6em, 1vw, 0.8em);
  }
  .inputContainer {
    width: 100%;

    > * {
      margin: 1em 0 0 0;
    }

    .highlight {
      border: 1px solid rgba(255, 0, 0, 0.2);
    }

    label {
      color: var(--primary);
      font-size: clamp(1em, 4vw, 1.5em);
      display: block;
      width: 100%;
    }

    input {
      width: 50%;
      background: #ececec;
      color: #383838;
      border-radius: 5px;

      padding: 0.5em;
      font-size: clamp(0.8em, 3vw, 1em);

      transition: box-shadow 0.3s;
    }
  }

  button {
    margin: 1em 0 0;
    background: #4d4476;
    color: #fff;
    border-radius: 5px;
    padding: clamp(0.3em, 2vw, 0.6em) 1.5em;
    font-size: clamp(0.8em, 3vw, 1em);

    font-weight: 500;
  }

  @media only screen and (max-width: 600px) {
    .inputContainer {
      label {
        text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
      }
      input {
        width: 70%;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
      }
      .error {
        border: 1px solid rgba(255, 0, 0, 0.1);
      }
    }
  }
`

export default Form
