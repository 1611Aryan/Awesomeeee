import styled from "styled-components"
import { IoSend } from "react-icons/io5"
import React, { useState, useEffect, useRef } from "react"
import { useSelectedContact } from "Providers/SelectedContactProvider"
import { useSocket } from "Providers/SocketProvider"

import { useDispatch, useSelector } from "react-redux"
import { rootState } from "Reducers"
import { actionsContacts } from "Actions/contactsAction"

const Input: React.FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [input, setInput] = useState("")

  const { socket } = useSocket()
  const { user } = useSelector((state: rootState) => state)
  const dispatch = useDispatch()
  const { selected } = useSelectedContact()

  useEffect(() => {
    if (selected && inputRef.current) {
      inputRef.current.focus()
      setInput("")
    }
  }, [selected])

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input && socket && user && selected) {
      socket.emit(
        "sendMessage",
        {
          message: input,
          sender: user.username,
        },
        selected.roomId,
        selected.contactId
      )
      dispatch({
        type: actionsContacts.ADD_MESSAGE,
        payload: {
          message: { roomId: selected.roomId, message: input, sender: "me" },
        },
      })
      setInput("")
    }
  }

  return (
    <StyledInput>
      <div className="border"></div>
      <form onSubmit={submitHandler}>
        <textarea
          value={input}
          ref={inputRef}
          onChange={changeHandler}
        ></textarea>
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
    padding: clamp(0.6em, 2vw, 0.8em) clamp(0.5em, 2vw, 0.75em);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    textarea {
      width: 100%;

      background: rgb(16, 16, 16, 0.5);
      border-radius: 5px 0 0 5px;
      padding: calc(var(--InputFontSize) / 3) calc(var(--InputFontSize) / 2);
      font-size: clamp(0.8em, 2vw, 1em);
      font-family: var(--fontContent);
      color: #bdbdbd;
      resize: none;

      border: none;

      &:focus {
        outline: none;
      }
    }
    button {
      background: rgb(16, 16, 16, 0.5);
      border-radius: 0 5px 5px 0;
      color: #bdbdbd;
      padding: calc(var(--InputFontSize) / 3) calc(var(--InputFontSize) / 1.5);
      font-size: clamp(1em, 2vw, 1.25em);

      display: grid;
      place-items: center;
      position: relative;
    }
  }
`

export default Input
