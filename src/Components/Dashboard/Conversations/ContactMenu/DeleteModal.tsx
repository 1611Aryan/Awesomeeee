import axios from "axios"
import React from "react"
import styled from "styled-components"
import { deleteContact } from "../../../../API_Endpoints"

const DeleteModal: React.FC<{
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
  const DeleteContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (menuConfig.contact)
      try {
        const res = await axios[deleteContact.METHOD](
          deleteContact.URL,
          {
            contactId: menuConfig.contact.contactId,
          },
          {
            withCredentials: true,
          }
        )
        console.log(res)
      } catch (err) {
        console.log(err.response)
      }
  }

  return (
    <StyledDeleteModal onSubmit={DeleteContact}>
      <h2>
        Are you sure you want to delete "
        <strong>{menuConfig.contact && menuConfig.contact.contactName}"</strong>
        &nbsp;contact info?
      </h2>
      <div className="buttons">
        <button type="submit">Yes</button>
        <button type="button" onClick={cancel}>
          Oops
        </button>
      </div>
    </StyledDeleteModal>
  )
}

const StyledDeleteModal = styled.form`
  width: 30vw;
  background: #456d;
  backdrop-filter: blur(2px);
  border-radius: 5px;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  padding: 1em 1.25em;

  color: white;
  font-family: var(--fontContent);

  * {
    margin: 1em 0;
  }

  h2 {
    width: 100%;
    font-weight: 400;
    line-height: 1.5;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  }

  .buttons {
    button {
      font-size: 1em;
      font-family: var(--fontContent);
      background: #567d;
      color: white;

      padding: 0.6em 1em;
      border-radius: 3px;
      box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1),
        -1px 1px 4px rgba(0, 0, 0, 0.1);

      transition: all 0.1s;

      &:focus,
      &:hover {
        background: #fffd;
        color: #567f;
      }

      &:nth-of-type(1) {
        &:focus,
        &:hover {
          background: #ffcfcfdd;
          color: #5a3434;
        }
      }
    }

    * + * {
      margin-left: 1em;
    }
  }
`

export default DeleteModal
