import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { userI } from "./User.Slice"

export type messageI = {
  message: string
  sender: string
}

export type contactI = {
  name: userI["username"]
  contactId: userI["_id"]
  profilePicture: {
    thumbnail: string
    large: string
  }
  roomId: string
  online: boolean
  lastSeen: string
  lastMessage: string
  messages: messageI[]
}

type contactStatus = {
  contactId: contactI["contactId"]
  status: contactI["online"]
}

type updatedContact = {
  contactId: contactI["contactId"]
  properties: {
    key: "name" | "profilePicture"
    value: any
  }[]
}

const contactSlice = createSlice({
  name: "contact",
  initialState: { contacts: [] } as { contacts: contactI[] },
  reducers: {
    addContacts: (state, action: PayloadAction<contactI[]>) => {
      state.contacts = action.payload.map(contact => ({
        ...contact,
        online: false,
        messages: [],
      }))
    },
    addContact: (state, action: PayloadAction<contactI>) => {
      state.contacts.push({ ...action.payload, online: false, messages: [] })
    },
    addMessage: (
      state,
      action: PayloadAction<messageI & { roomId: string }>
    ) => {
      const num = state.contacts.length

      for (let i = 0; i < num; i++) {
        if (state.contacts[i].roomId === action.payload.roomId) {
          state.contacts[0].messages.push({
            message: action.payload.message,
            sender: action.payload.sender,
          })
          break
        }
      }
    },
    changeContactStatus: (state, action: PayloadAction<contactStatus>) => {
      const index = state.contacts.findIndex(
        contact => contact.contactId === action.payload.contactId
      )
      if (index >= 0) state.contacts[index].online = action.payload.status
    },
    updateContact: (state, action: PayloadAction<updatedContact>) => {
      const index = state.contacts.findIndex(
        contact => contact.contactId === action.payload.contactId
      )
      action.payload.properties.forEach(property => {
        state.contacts[index][property.key] = property.value
      })
    },
    deleteContact: (
      state,
      action: PayloadAction<{ id: contactI["contactId"] }>
    ) => {
      state.contacts.filter(contact => contact.contactId !== action.payload.id)
    },
  },
})

export const {
  addContacts,
  addContact,
  addMessage,
  changeContactStatus,
  updateContact,
  deleteContact,
} = contactSlice.actions

const contactReducer = contactSlice.reducer

export default contactReducer
