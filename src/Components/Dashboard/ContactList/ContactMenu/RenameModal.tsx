import axios from "axios"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { actionsContacts } from "Actions/contactsAction"
import { updateContact } from "API_Endpoints"

import quill from "Media/PNG/quill.png"

const RenameModal: React.FC<{
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
  const [name, setName] = useState("")

  const dispatch = useDispatch()

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const rename = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name && menuConfig.contact)
      try {
        await axios[updateContact.METHOD](
          updateContact.URL,
          {
            contactId: menuConfig.contact.contactId,
            newName: name,
          },
          {
            withCredentials: true,
          }
        )
        dispatch({
          type: actionsContacts.UPDATE_CONTACT,
          payload: {
            updatedContacts: {
              contactId: menuConfig.contact.contactId,
              properties: [
                {
                  key: "name",
                  value: name,
                },
              ],
            },
          },
        })
        cancel()
      } catch (err) {
        err.response ? console.log(err.response) : console.log(err)
      }
  }

  return (
    <StyledRenameModal>
      <StyledForm onSubmit={rename}>
        <h1>Rename Contact</h1>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={changeHandler}
          placeholder={menuConfig.contact ? menuConfig.contact.contactName : ""}
          autoFocus
          required
        />
        <div className="buttons">
          <button type="submit">Change</button>
          <button type="button" onClick={cancel}>
            Abort
          </button>
        </div>
      </StyledForm>
      <StyledImage>
        <img src={quill} alt="Quill" />
      </StyledImage>
    </StyledRenameModal>
  )
}

const StyledRenameModal = styled.div`
  width: 40vw;
  background: #456d;
  backdrop-filter: blur(2px);
  border-radius: 5px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0em 1.5em;
`

const StyledForm = styled.form`
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  color: white;
  font-family: var(--fontContent);

  * {
    margin: 1em 0;
  }

  h1 {
    font-family: var(--fontHeading);
    color: white;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  }

  label {
    font-size: 1.2em;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  }
  input {
    width: 100%;
    font-size: 1.1em;

    font-family: var(--fontContent);
    font-weight: 300;
    color: white;

    border-radius: 3px;

    overflow: hidden;

    background: #345a;
    padding: 0.5em 0.3em;

    transition: all 0.1s;

    &:focus {
      background: #6789;
      font-weight: 400;
      color: #2b2b2b;
    }
    ::placeholder {
      color: #789c;
      font-weight: 400;
    }
  }

  .buttons {
    width: 100%;
    button {
      min-width: 30%;
      font-size: 1em;
      font-family: var(--fontContent);
      background: #567d;
      color: white;

      padding: 0.6em 0.8em;
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

const StyledImage = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    width: 75%;
    object-fit: cover;
    aspect-ratio: 1 / 1;

    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));

    display: inline-block;

    @media (hover: hover) {
      transition: transform 0.1s;
      &:hover {
        animation: shake 650ms linear infinite alternate;
      }
    }

    @keyframes shake {
      from {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(2deg);
      }
      to {
        transform: rotate(-2deg);
      }
    }
  }
`

export default RenameModal
