import Greeting from "Media/PNG/Greeting.png"
import React from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { rootState } from "Reducers"
import styled from "styled-components"

const Page1: React.FC<{
  pagesRef: React.RefObject<HTMLDivElement>
  formData: FormData
}> = ({ pagesRef, formData }) => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  })

  const { user } = useSelector((state: rootState) => state)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(input => ({
      ...input,
      [e.target.name]: e.target.value,
    }))
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    formData.append("username", input.username)
    input.password && formData.append("password", input.password)
    if (pagesRef.current) pagesRef.current.style.transform = "translateX(-50%)"
  }

  return (
    <StyledPage1>
      <h1>Let's Get Started</h1>
      <div className="content">
        <form onSubmit={submitHandler}>
          <div className="fieldContainer">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              onChange={changeHandler}
              placeholder={user ? user.username : ""}
              required
              autoFocus
            />
          </div>
          {user && user.strategyUsed === "google" && (
            <div className="fieldContainer">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                onChange={changeHandler}
                required
              />
            </div>
          )}
          <button>Next</button>
        </form>
        <div className="imageContainer">
          <img src={Greeting} alt="Greetings" />
        </div>
      </div>
    </StyledPage1>
  )
}

const StyledPage1 = styled.div`
  width: calc(var(--pageWidth) - 2 * var(--paddingRight));
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  h1 {
    color: #fff;
    font-family: var(--fontHeading);
    font-size: 3em;
    line-height: 1;
  }

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    form {
      width: 50%;

      font-family: var(--fontContent);
      .fieldContainer {
        width: 100%;

        display: flex;
        flex-direction: column;

        label {
          font-size: 1.2em;
          font-weight: 400;
          color: white;
          letter-spacing: 1px;
        }
        input {
          display: block;
          width: 100%;
          margin: 1em 0;

          padding: 0.5em 0.4em;
          font-size: 1em;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.9);

          &:focus {
            box-shadow: 0px 0px 0px 2px rgba(255, 255, 255, 0.5);
          }
        }
      }
      button {
        padding: 0.8em 1.75em;
        border-radius: 5px;
        font-size: 1em;
        color: #fff;

        background: linear-gradient(90deg, #d9c026, #ecb819);
        box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25),
          inset 2px 2px 4px rgba(0, 0, 0, 0.25);
      }
    }

    .imageContainer {
      width: 40%;
      height: 100%;
      display: flex;
      align-items: center;

      img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        filter: saturate(90%) drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.2));
      }
    }
  }
`

export default Page1
