import React, { useContext, createContext, useState, useEffect } from "react"

export interface contactI {
  name: userI["username"]
  contactId: userI["_id"]
  profilePicture: userI["profilePicture"]
  roomId: string
  recentMessage?: string
}
export interface userI {
  _id: string
  username: string
  email: string
  phone?: string
  profilePicture: {
    large: string
    thumbnail: string
  }
  contacts: contactI[]
}

export interface messageI {
  sender: string
  message: string
}
export interface messagePoolI {
  name: string
  messages: messageI[] | null
  roomId: contactI["roomId"]
}

const UserContext = createContext<{
  user: userI | null
  setUser: React.Dispatch<React.SetStateAction<userI | null>>
  contacts: userI["contacts"] | null
  rooms: string[] | null
  addContact: (contact: contactI) => void
  messagePool: messagePoolI[] | null
  setMessagePool: React.Dispatch<React.SetStateAction<messagePoolI[] | null>>
  addMessageToRoom: (
    roomId: string,
    {
      message,
      sender,
    }: {
      message: string
      sender: string
    }
  ) => void
}>({
  user: null,
  setUser: () => {},
  contacts: null,
  rooms: null,
  addContact: () => {},
  messagePool: null,
  setMessagePool: () => {},
  addMessageToRoom: () => {},
})

export const useUser = () => useContext(UserContext)

export const UserProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [user, setUser] = useState<userI | null>(null)

  const [contacts, setContacts] = useState<contactI[] | null>(null)

  const [rooms, setRooms] = useState<string[] | null>(null)

  const addContact = (contact: contactI) => {
    setUser(user => {
      return user ? { ...user, contacts: [...user.contacts, contact] } : null
    })
  }

  const [messagePool, setMessagePool] = useState<messagePoolI[] | null>(null)

  const addMessageToRoom = (
    roomId: string,
    { message, sender }: { message: string; sender: string }
  ) => {
    console.log("Adding")
    setMessagePool(messagePool => {
      if (messagePool) {
        return messagePool.map(m =>
          m.roomId === roomId
            ? {
                ...m,
                messages: m.messages
                  ? [...m.messages, { sender, message }]
                  : [{ sender, message }],
              }
            : m
        )
      } else return null
    })
  }

  useEffect(() => {
    if (user) {
      setContacts(user.contacts)
      setRooms(() => user.contacts.map(contact => contact.roomId))
    }
  }, [user])

  useEffect(() => {
    if (messagePool === null && contacts)
      setMessagePool(() =>
        contacts.map(contact => {
          return { name: contact.name, messages: null, roomId: contact.roomId }
        })
      )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        contacts,
        rooms,
        addContact,
        messagePool,
        setMessagePool,
        addMessageToRoom,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
