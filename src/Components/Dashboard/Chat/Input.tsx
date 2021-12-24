import styled from "@emotion/styled"
import { IoSend } from "react-icons/io5"
import React, { useEffect, useRef } from "react"
import { useSelectedContact } from "Providers/SelectedContactProvider"
import { useSocket } from "Providers/SocketProvider"
import useTypedSelector from "Hooks/useTypedSelector"
import useTypedDispatch from "Hooks/useTypedDispatch"
import { addMessage } from "Redux/Slices/Contact.Slice"

const Input: React.FC = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { socket } = useSocket()
  const { user } = useTypedSelector(state => state.user)
  const dispatch = useTypedDispatch()
  const { selected } = useSelectedContact()

  const submitform = () => {
    if (inputRef.current?.value && socket && user && selected) {
      const message = inputRef.current?.value
      socket.emit(
        "sendMessage",
        {
          message,
          sender: user.username,
        },
        selected.roomId,
        selected.contactId
      )
      dispatch(addMessage({ roomId: selected.roomId, message, sender: "me" }))
      inputRef.current.value = ""
    }
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submitform()
  }

  useEffect(() => {
    if (selected && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.value = ""
    }
  }, [selected])

  useEffect(() => {
    if (inputRef.current)
      inputRef.current.addEventListener("keypress", e => {
        if (e.key === "Enter" && !e.shiftKey) {
          submitform()
          e.preventDefault()
        }
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef])

  return (
    <StyledInput>
      <div className="border"></div>
      <form onSubmit={submitHandler}>
        <textarea ref={inputRef}></textarea>
        <button type="submit">
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
