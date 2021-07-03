import { userI } from "./userActions"

export type messageI = {
  message: string
  sender: string
  time: string
}

export type contactI = {
  name: userI["username"]
  contactId: userI["_id"]
  profilePicture: userI["profilePicture"]
  roomId: string
  online: boolean | null
  lastSeen: string
  lastMessage: string
  messages: messageI[] | null
  lastUpdated?: string
}

export enum actionsContacts {
  SET_CONTACTS = "setContacts",
  ADD_MESSAGE = "addMessage",
  ADD_CONTACT = "addContact",
  CHANGE_CONTACT_STATUS = "changeContactStatus",
  UPDATE_CONTACT = "updateContact",
}

export type payload = {
  contacts: contactI[] | null
  message: {
    roomId: string
    message: string
    sender: string
  }
  newContact: contactI
  contactStatus: {
    contactId: contactI["contactId"]
    status: contactI["online"]
  }
  updatedContacts: {
    contactId: contactI["contactId"]
    properties: {
      key: "name" | "profilePicture" | "lastUpdated"
      value: any
    }[]
  }
}

export const setContacts = (contacts: contactI[] | null) => ({
  type: actionsContacts.ADD_CONTACT,
  payload: { contacts },
})

export const addMessage = (
  roomId: string,
  { message, sender }: { message: string; sender: string }
) => {
  return {
    type: actionsContacts.ADD_MESSAGE,
    payload: {
      message: {
        roomId,
        message,
        sender,
      },
    },
  }
}

export const addContact = (contact: contactI) => ({
  type: actionsContacts.ADD_CONTACT,
  payload: { newContact: contact },
})

export const changeContactStatus = (
  contactId: contactI["contactId"],
  status: contactI["online"]
) => ({
  type: actionsContacts.CHANGE_CONTACT_STATUS,
  payload: { contactStatus: { contactId, status } },
})

export const updateContact = (
  contactId: string,
  ...properties: { key: string; value: string }[]
) => ({
  type: actionsContacts.UPDATE_CONTACT,
  payload: {
    updatedContacts: {
      contactId,
      properties,
    },
  },
})
