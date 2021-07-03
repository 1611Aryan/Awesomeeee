import axios from "axios"
import React, { useState } from "react"
import styled from "styled-components"
import { updateContact } from "../../../../API_Endpoints"

const RenameModal: React.FC<{
  menuConfig: {
    positionY: number
    openState: boolean
    contact: {
      contactId: string
      contactName: string
    } | null
  }
  cancel: () => void
}> = ({ menuConfig, cancel }) => {
  const [name, setName] = useState("")

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const rename = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name && menuConfig.contact)
      try {
        const res = await axios[updateContact.METHOD](
          updateContact.URL,
          {
            contactId: menuConfig.contact.contactId,
            newName: name,
          },
          {
            withCredentials: true,
          }
        )
        console.log(res)
        cancel()
      } catch (err) {
        console.log(err.response)
      }
  }

  return (
    <StyledRenameModal onSubmit={rename}>
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
          Cancel
        </button>
      </div>
    </StyledRenameModal>
  )
}

const StyledRenameModal = styled.form`
  width: 30vw;
  background: #456d;
  backdrop-filter: blur(2px);
  border-radius: 5px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  padding: 1em;

  color: white;
  font-family: var(--fontContent);

  * {
    margin: 0.5em 0;
  }

  h1 {
    font-family: var(--fontHeading);
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  }

  label {
    font-size: 1.2em;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  }
  input {
    width: 60%;
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
    button {
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

export default RenameModal
