import axios from "axios"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useAccess } from "../../../Providers/AccessProvider"

import sizeOf from "object-sizeof"
import { baseUrl, googleAuth, loginEndpoint } from "../../../API_Endpoints"

import google from "./../../../Media/PNG/google_icon_2048 (1).png"
import facebook from "./../../../Media/PNG/facebook.png"

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

      console.log(sizeOf(res))
      if (res.data.success)
        setAccess({ loggedIn: true, username: res.data.username })
    } catch (err) {
      console.log(err.response.data)
      setError(err.response.data)
    }
  }

  const googleAuthHandler = async () => {
    let width = 500
    let height = 750
    let params = `"location=1,status=1,scrollbars=1,resizable=no,toolbar=no,menubar=no,
width=${width},height=${height},left=${(window.innerWidth - width) / 2},top=${
      (window.innerHeight - height) / 2
    }`
    window.open(googleAuth.URL, "login", params)

    window.addEventListener("message", (message: MessageEvent<payload>) => {
      if (message.origin === baseUrl) {
        console.log(message.data)
        if (message.data.success)
          setAccess({ loggedIn: true, username: message.data.username })
      }
    })
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

      <button>Login</button>

      <div className="oAuth">
        <div className="or">
          <div className="line"></div>
          <h3>OR</h3>
          <div className="line"></div>
        </div>

        <div className="providers">
          <div className="logo" onClick={googleAuthHandler}>
            <div className="imgContainer">
              <img src={google} alt="google" />
            </div>
            <span>Sign in with Google</span>
          </div>

          <div className="logo facebook">
            <div className="imgContainer">
              <img src={facebook} alt="facebook" />
            </div>
            <span>Sign in with Facebook</span>
          </div>
        </div>
      </div>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  position: relative;
  width: 100%;
  padding: 0 var(--padding) 0 calc(var(--padding) * 1.25);

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

  .oAuth {
    width: 100%;
    margin-top: 1em;
    .or {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
      .line {
        width: 100%;
        height: 1px;
        background: #8b8b8b;
        flex: 1;
      }
      h3 {
        color: #8b8b8b;
      }
    }
    .providers {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      margin-top: 1.5em;
      background: #4285f4;

      border-radius: 2px;

      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;

      cursor: pointer;

      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
      .imgContainer {
        margin: 1px 1px;
        height: 38px;
        width: 39px;
        background: #fff;
        display: grid;
        place-items: center;
        padding: 0 8px;

        border-radius: 1px;

        img {
          height: 18px;
          width: 18px;
        }
      }
      span {
        font-family: var(--fontGoogle);
        padding: 0 32px 0 8px;
        font-size: 16px;
        color: #fff;
      }
    }
    .facebook {
      background: #4267b2;

      .imgContainer {
        background: none;
        margin: 0;
        height: 100%;
        img {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
`

export default Form
