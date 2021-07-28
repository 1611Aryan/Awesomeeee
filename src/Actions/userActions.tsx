import { contactI } from "./contactsAction"

export type userI = {
  _id: string
  username: string
  email: string
  phone?: string
  profilePicture: {
    large: string
    thumbnail: string
    fileId: string
  }
  profileSetup: boolean
  strategyUsed: "local" | "google"
}

export enum actionsUser {
  ADD_USER = "adduser",
  UPDATE_USER = "updateUser",
}

export type payload = {
  user: userI
  contact: contactI
  onlineStatus: { contactId: string; status: boolean }
  lastMessage: {
    roomId: string
    message: string
  }
  properties: {
    key: "profilePicture" | "profileSetup" | "username"
    value: any
  }[]
}

export const addUser = (user: payload["user"] | null) => {
  return { type: actionsUser.ADD_USER, payload: { user } }
}

export const updateUser = (...properties: payload["properties"]) => {
  return {
    type: actionsUser.UPDATE_USER,
    payload: { properties },
  }
}
