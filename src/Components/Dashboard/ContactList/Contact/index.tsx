import axios from "axios"
import { useEffect } from "react"
import styled from "@emotion/styled"

import { useSelectedContact } from "Providers/SelectedContactProvider"
import Content from "./ContactContent"
import Options from "./ContactOptions"
import ProfilePicture from "./ContactProfilePicture"

import { autoUpdateContact } from "API_Endpoints"
import { contactI, updateContact } from "Redux/Slices/Contact.Slice"
import useTypedDispatch from "Hooks/useTypedDispatch"

const Contact: React.FC<{
  contact: contactI
  setMenuConfig: React.Dispatch<
    React.SetStateAction<{
      positionY: number
      openState: boolean
      contact: {
        contactId: string
        contactName: string
        roomId: string
      } | null
    }>
  >
  setContactPageVis: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      contact: contactI | null
    }>
  >
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ contact, setMenuConfig, setContactPageVis, setShowConversations }) => {
  const { selected, setSelected } = useSelectedContact()
  const dispatchContact = useTypedDispatch()

  const clickHandler = () => {
    setSelected({
      roomId: contact.roomId,
      contactId: contact.contactId,
    })
    setShowConversations(false)
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (
          selected &&
          selected.contactId === contact.contactId &&
          (contact.lastUpdated === undefined ||
            (contact.lastUpdated &&
              (Date.now() - parseInt(contact.lastUpdated)) / (1000 * 60) > 10))
        ) {
          const res = await axios[autoUpdateContact.METHOD]<{
            message: "Up to Date" | "Updating Contact"
            payload: null | {
              profilePicture: contactI["profilePicture"]
            }
          }>(
            autoUpdateContact.URL,
            {
              contact,
            },
            {
              withCredentials: true,
            }
          )

          if (
            res.data.message === "Updating Contact" &&
            res.data.payload &&
            res.data.payload.profilePicture
          ) {
            dispatchContact(
              updateContact({
                contactId: contact.contactId,
                properties: [
                  {
                    key: "profilePicture",
                    value: res.data.payload?.profilePicture,
                  },
                  { key: "lastUpdated", value: Date.now() },
                ],
              })
            )
          } else {
            dispatchContact(
              updateContact({
                contactId: contact.contactId,
                properties: [{ key: "lastUpdated", value: Date.now() }],
              })
            )
          }
        }
      } catch (err: any) {
        console.log(err, err.response)
      }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <StyledContact
      onClick={clickHandler}
      className={
        selected && selected.roomId === contact.roomId ? "selected" : ""
      }
      tabIndex={1}
    >
      <ProfilePicture setContactPageVis={setContactPageVis} contact={contact} />
      <Content contact={contact} />
      <Options setMenuConfig={setMenuConfig} contact={contact} />
    </StyledContact>
  )
}

const StyledContact = styled.li`
  width: 100%;
  padding: clamp(0.7em, 1vw, 0.8em) clamp(0.4em, 1vw, 0.5em);

  overflow: hidden;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: rgb(16, 16, 16, 0.4);

  border-bottom: 1px solid #0004;
  transform-origin: 0 0;
  transition: all 100ms;

  cursor: pointer;

  &:hover,
  &:focus {
    background: rgba(12, 12, 12, 0.6);
  }
`

export default Contact
