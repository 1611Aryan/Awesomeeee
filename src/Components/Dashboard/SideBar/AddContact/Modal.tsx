import axios from "axios"
import { motion } from "framer-motion"
import React, { useState } from "react"
import { useRef } from "react"
import styled from "styled-components"
import { useUser } from "../../../../Providers/UserProvider"
import dog1 from "./../../../../Media/PNG/dog1.png"

const Modal: React.FC<{
  setAddContact: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setAddContact }) => {
  const addContactUrl = "http://localhost:5000/user/addContact"

  const imageRef = useRef<HTMLImageElement>(null)

  const [input, setInput] = useState({
    nickname: "",
    username: "",
  })
  const [err, setErr] = useState("")

  const variants = {
    initial: {
      opacity: 0,
      scale: 0,
      x: "-100%",
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      scale: 0,
      x: "100%",
    },
  }

  const { addContact } = useUser()

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(input => ({
      ...input,
      [e.target.name]: e.target.value,
    }))
  }

  const closeModal = () => {
    setAddContact(false)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await axios.patch<{
        message: string
        contact: {
          name: string
          contactId: string
          profilePicture: {
            thumbnail: string
            large: string
          }
          roomId: string
        }
      }>(
        addContactUrl,
        {
          name: input.nickname,
          username: input.username,
        },
        {
          withCredentials: true,
        }
      )
      console.log(res)
      setErr(res.data.message)
      addContact(res.data.contact)
      closeModal()
    } catch (err) {
      console.log(err.response.data)
      err.response.data.message && typeof err.response.data.message === "string"
        ? setErr(err.response.data.message)
        : setErr("An error occured. Try again Later😔")
    }
  }

  return (
    <StyledModal>
      <motion.div
        className="modal"
        variants={variants}
        style={{ originY: "center" }}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h1>Add a Friend</h1>
        <div className="content">
          <div className="formContainer">
            <form onSubmit={submitHandler}>
              <p className="error">{err}</p>
              <div className="fieldContainer">
                <label htmlFor="nickname">Nickname</label>
                <input
                  type="text"
                  value={input.nickname}
                  autoFocus
                  name="nickname"
                  onChange={changeHandler}
                />
              </div>
              <div className="fieldContainer">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  value={input.username}
                  name="username"
                  onChange={changeHandler}
                />
              </div>
              <div className="buttonContainer">
                <button type="submit">Add</button>
                <button type="button" onClick={closeModal}>
                  Later
                </button>
              </div>
            </form>
          </div>
          <div className="imgContainer">
            <img src={dog1} ref={imageRef} alt="dog" />
          </div>
        </div>
      </motion.div>
    </StyledModal>
  )
}

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: grid;
  place-items: center;

  z-index: 10;

  .modal {
    width: 60%;
    height: 65%;
    padding: 1em 2em;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      linear-gradient(to top, #2b5876, #4e4376);

    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25),
      -4px -4px 10px rgba(0, 0, 0, 0.25);

    border-radius: 25px;

    font-family: var(--fontContent);
  }
  h1 {
    color: #fff;
    font-family: var(--fontHeading);
    font-size: 2.5em;
    line-height: 1;
  }
  .content {
    width: 100%;
    height: calc(60vh - 2em - 2em);
    display: flex;
    justify-content: space-between;
    align-items: center;

    .formContainer {
      width: 60%;
      height: 100% !important;

      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    form {
      width: 100%;

      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;

      & > * + * {
        margin: 0.75em 0;
      }

      .error {
        line-height: 1;
        height: 0.7em;
        font-size: 0.7em;
        font-weight: 300;
        color: #eb7960;
      }

      .fieldContainer {
        width: 100%;

        label {
          font-size: 1.1em;
          font-weight: 400;
          color: white;
          letter-spacing: 1px;
        }
        input {
          margin: 0.5em 0;
          width: 80%;
          padding: 0.3em 0.2em;
          font-size: 1em;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.9);
        }
      }
      .buttonContainer {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        gap: 1em;
        button {
          padding: 0.6em 1.5em;
          border-radius: 5px;
          font-size: 0.9em;
          color: #fff;

          &:nth-of-type(1) {
            background: linear-gradient(
              90deg,
              rgba(101, 117, 255, 0.923958) 0.01%,
              #4c5eff 99.97%
            );
            box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25),
              inset 2px 2px 4px rgba(0, 0, 0, 0.25);
          }
          &:nth-of-type(2) {
            background: linear-gradient(90deg, #a065ff 0.01%, #f14cff 99.97%);
            box-shadow: inset -2px -2px 4px rgba(0, 0, 0, 0.25),
              inset 2px 2px 4px rgba(0, 0, 0, 0.25);
          }
        }
      }
    }

    .imgContainer {
      width: 40%;
      height: 80%;

      overflow: hidden;
      img {
        max-width: 100%;
        width: auto;
        height: 100%;
        object-fit: contain;

        filter: saturate(100%);
      }
    }
  }
`

export default Modal
