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
  property: {
    key: string
    value: string
  }
}

export const addUser = (user: payload["user"] | null) => {
  return { type: actionsUser.ADD_USER, payload: { user } }
}

export const updateUser = ({ key, value }: payload["property"]) => {
  return {
    type: actionsUser.UPDATE_USER,
    payload: { property: { key, value } },
  }
}
