import axios from "axios"
import React from "react"
import styled from "@emotion/styled"

import { deleteContactEndpoint } from "API_Endpoints"
import { useSocket } from "Providers/SocketProvider"

import dustbin from "Media/PNG/dustbin.png"
import useTypedDispatch from "Hooks/useTypedDispatch"
import { deleteContact } from "Redux/Slices/Contact.Slice"

const DeleteModal: React.FC<{
  menuConfig: {
    positionY: number
    openState: boolean
    contact: {
      contactId: string
      contactName: string
      roomId: string
    } | null
  }
  cancel: () => void
}> = ({ menuConfig, cancel }) => {
  const { socket } = useSocket()
  const dispatch = useTypedDispatch()

  const DeleteContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (menuConfig.contact)
      try {
        await axios[deleteContactEndpoint.METHOD](
          deleteContactEndpoint.URL,
          {
            contactId: menuConfig.contact.contactId,
          },
          {
            withCredentials: true,
          }
        )
        dispatch(
          deleteContact({
            id: menuConfig.contact.contactId,
          })
        )
        socket && socket.emit("leaveRoom", menuConfig.contact.roomId)
        cancel()
      } catch (err: any) {
        console.log(err.response)
      }
  }

  return (
    <StyledDeleteModal>
      <StyledForm onSubmit={DeleteContact}>
        <h2>
          Are you sure you want to delete "
          <strong>
            {menuConfig.contact && menuConfig.contact.contactName}"
          </strong>
          &nbsp;contact info?
        </h2>
        <div className="buttons">
          <button type="submit">Yes</button>
          <button type="button" onClick={cancel}>
            Oops
          </button>
        </div>
      </StyledForm>

      <img src={dustbin} alt="dustbin" />
    </StyledDeleteModal>
  )
}

const StyledDeleteModal = styled.div`
  width: 35vw;
  background: #456d;
  backdrop-filter: blur(2px);
  border-radius: 5px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  padding: 0em clamp(0.7em, 2vw, 1em);

  position: relative;

  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    object-fit: cover;
    aspect-ratio: 1/1;

    opacity: 0.2;
    filter: blur(1px);
  }

  @media only screen and (max-width: 500px) {
    width: 90%;
    height: 40%;
  }
`

const StyledForm = styled.form`
  position: relative;
  z-index: 2;
  color: white;
  font-family: var(--fontContent);
  display: flex;
  flex-direction: column;

  & > * {
    margin: 2em 0;
  }

  h2 {
    align-self: center;
    width: 90%;
    font-weight: 400;
    line-height: 1.5;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    text-align: center;
    margin-bottom: 4em;
    font-size: clamp(1em, 3vw, 1.5em);
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
    button {
      min-width: 20%;
      font-size: clamp(0.9em, 3vw, 1.1em);
      font-family: var(--fontContent);
      background: #567d;
      color: white;

      padding: 0.6em 1.3em;
      border-radius: 3px;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1),
        -1px 1px 4px rgba(0, 0, 0, 0.1);

      transition: all 0.1s;

      &:focus,
      &:hover {
        background: #fffd;
        color: #567f;
      }
    }

    * + * {
      margin-left: 1em;
    }
  }
`

export default DeleteModal
