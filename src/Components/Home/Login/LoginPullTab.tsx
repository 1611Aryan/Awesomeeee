import styled from "styled-components"
import { FiChevronLeft } from "react-icons/fi"
import { useEffect, useState } from "react"
import { useAccess } from "Providers/AccessProvider"

import { loginEndpoint } from "API_Endpoints"
import axios from "axios"
import OAuth from "./OAuth"
import { Link } from "react-router-dom"

type payload = {
  success: boolean
  username: string
}

const LoginPullTab = () => {
  const [displayLogin, setDisplayLogin] = useState(false)

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

  const scootOver = () => {
    setDisplayLogin(true)
    const event = new Event("loginOpened")

    window.dispatchEvent(event)
  }

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
    <StyledPullTab className={displayLogin ? "visibleLogin" : ""}>
      <div className="tab" onClick={scootOver}>
        <FiChevronLeft />
      </div>
      <div className="login">
        <span onClick={scootOver}>Login</span>
      </div>
      <div className="formContainer">
        <form onSubmit={submitHandler}>
          <div className="inputContainer">
            <label htmlFor="username_email">Email/Username</label>
            <p className="errorMessage">
              {error && error.type === "username" ? error.info : ""}
            </p>
            <input
              type="text"
              name="username_email"
              autoFocus
              required
              onChange={changeHandler}
            />
          </div>
          <div className="inputContainer">
            <label htmlFor="password">Password</label>
            <p className="errorMessage">
              {error && error.type === "password" ? error.info : ""}
            </p>
            <input
              type="password"
              name="password"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="buttons">
            <button>Login</button>
            <span>
              <Link to="/forgot-password">Forgot Password?</Link>
            </span>
          </div>
          <OAuth />
        </form>
      </div>
    </StyledPullTab>
  )
}

const StyledPullTab = styled.div`
  position: fixed;
  top: 0;
  left: 80vw;
  width: 120vw;
  height: 100vh;

  background: #fff;

  display: flex;

  transform: translateX(0%);

  .tab {
    position: absolute;
    top: 50%;
    left: -0.75em;
    transform: translateY(-50%);

    height: 2.5em;
    width: 2.5em;
    background: #fff;

    border-radius: 50%;

    display: grid;
    place-items: center;

    svg {
      color: var(--primary);
      font-size: 1.25em;
      cursor: pointer;
      transform: translateX(-0.5em);
    }
  }

  .login {
    width: 20vw;

    display: grid;
    place-items: center;
    span {
      position: relative;
      z-index: 2;

      font-size: 1.15em;
      font-weight: 500;
      color: var(--primary);

      cursor: pointer;
      font-family: var(--fontContent);
    }
  }

  .formContainer {
    width: 100vw;
    height: 100%;

    display: grid;
    place-items: center;
    padding: 0 var(--padding);

    font-family: var(--fontContent);

    form {
      margin-top: 2em;
      width: 100%;
      height: 80%;
      border-radius: 10px;

      background: linear-gradient(to top, #2b5876, #4e4376);

      padding: 1em 1.5em;

      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;

      .inputContainer {
        display: flex;
        flex-direction: column;
        width: 100%;

        margin: 0.75em 0;

        label {
          color: white;
          font-size: 1.2em;
          font-weight: 300;
        }

        .errorMessage {
          color: coral;
          line-height: 1;
          height: clamp(0.6em, 1vw, 0.9em);
          font-size: clamp(0.6em, 1vw, 0.8em);
          font-weight: 400;
          margin: 0.1em 0;
        }

        input {
          margin: 0.75em 0;

          width: 100%;
          padding: 0.3em;
          font-size: 1em;
          background: #ececec;
        }
      }

      .buttons {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
          margin: 0.75em 0;
          background: #4d4476;
          color: #fff;

          padding: 0.5em 1em;
          box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
          font-weight: 300;
          font-size: 1em;
        }
        span {
          display: inline-block;
          padding: 0.3em 0;
          font-size: clamp(0.7em, 3vw, 0.9em);
          transition: color ease-out 100ms;
          cursor: pointer;
          color: #fff;
          &:hover {
            color: #bcb243;
          }
        }
      }
    }
  }
`

export default LoginPullTab
