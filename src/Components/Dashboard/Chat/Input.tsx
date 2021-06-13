import styled from "styled-components"
import { IoSend } from "react-icons/io5"
import React, { useState } from "react"

const Input: React.FC<{
  setMessages: React.Dispatch<
    React.SetStateAction<
      {
        message: string
        sender: "me" | "contact"
      }[]
    >
  >
}> = ({ setMessages }) => {
  const [input, setInput] = useState("")

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setMessages(messages => [...messages, { sender: "me", message: input }])
    setInput("")
  }

  return (
    <StyledInput>
      <div className="border"></div>
      <form onSubmit={submitHandler}>
        <input type="text" value={input} onChange={changeHandler} />
        <button>
          <IoSend />
        </button>
      </form>
    </StyledInput>
  )
}

const StyledInput = styled.div`
  width: 100%;
  position: relative;
  min-height: 8vh;
  height: var(--InputHeight);

  .border {
    position: absolute;
    top: 0;
    left: 50%;

    transform: translateX(-50%);
    height: 2px;
    width: 100%;
    background: linear-gradient(to bottom, #dadada88, transparent);
  }
  form {
    padding: 0.8em 0.75em;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    input {
      width: 100%;

      background: rgb(16, 16, 16, 0.5);
      border-radius: 5px 0 0 5px;
      padding: calc(var(--InputFontSize) / 3) calc(var(--InputFontSize) / 2);
      font-size: var(--InputFontSize);
      font-family: var(--fontContent);
      color: #bdbdbd;
    }
    button {
      background: rgb(16, 16, 16, 0.5);
      border-radius: 0 5px 5px 0;
      color: #bdbdbd;
      padding: calc(var(--InputFontSize) / 3) calc(var(--InputFontSize) / 1.5);
      font-size: calc(var(--InputFontSize) * 1.25);

      display: grid;
      place-items: center;
      position: relative;
    }
  }
`

export default Input
