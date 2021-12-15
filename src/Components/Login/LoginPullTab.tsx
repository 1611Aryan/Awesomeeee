import styled from "@emotion/styled"
import { FiChevronLeft } from "react-icons/fi"
import { useState } from "react"

import OAuth from "./OAuth"
import { Link } from "react-router-dom"

import useTypedDispatch from "Hooks/useTypedDispatch"
import { loginUser } from "Redux/Slices/Access.Slice"
import { error, input, login } from "API/LoginApi"

const LoginPullTab: React.FC<{
  setPullTabActive: React.Dispatch<React.SetStateAction<boolean>>
  pullTabActive: boolean
}> = ({ pullTabActive, setPullTabActive }) => {
  const [input, setInput] = useState<input>({
    username_email: "",
    password: "",
  })
  const [error, setError] = useState<error>(null)

  const scootOver = () => setPullTabActive(true)

  const dispatch = useTypedDispatch()

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(input => ({ ...input, [e.target.name]: e.target.value }))
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const username = await login(input)
      dispatch(loginUser({ username }))
    } catch (err: any) {
      console.log(err.response.data)
      setError(err.response.data)
      setInput({ username_email: "", password: "" })
    }
  }

  return (
    <StyledPullTab className={pullTabActive ? "visibleLogin" : ""}>
      <div className="tab" onClick={scootOver}>
        <FiChevronLeft />
      </div>
      <div className="login" onClick={scootOver}>
        <span>Login</span>
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
  left: 0vw;
  width: 120vw;
  height: 100vh;

  font-size: 1.15rem;

  transform: translateX(calc(100% - 4em - 20vw));

  background: #fff;

  display: flex;

  transition: transform ease-in 100ms;

  @media only screen and (min-width: 500px) {
    display: none;
  }

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

      font-size: 1em;
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
          font-size: 1.1em;
          font-weight: 400;
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
          margin: 0.5em 0;

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
