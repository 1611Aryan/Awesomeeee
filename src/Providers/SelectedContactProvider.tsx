import React, { useContext, createContext, useState } from "react"
import { useSelector } from "react-redux"
import { contactI } from "../Actions/contactsAction"

import { rootState } from "../Reducers"

export type selectedI = {
  contactId: contactI["contactId"]
  roomId: contactI["roomId"]
}

const SelectedContactContext = createContext<{
  selected: selectedI | null
  setSelected: React.Dispatch<React.SetStateAction<selectedI | null>>
  messages: contactI["messages"]
}>({
  selected: null,
  setSelected: () => {},
  messages: null,
})

export const useSelectedContact = () => useContext(SelectedContactContext)

export const SelectedContactProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [selected, setSelected] = useState<selectedI | null>(null)

  const { contacts } = useSelector((state: rootState) => state)

  const messages =
    contacts && selected
      ? contacts.filter(contact => contact.roomId === selected.roomId)[0] &&
        contacts.filter(contact => contact.roomId === selected.roomId)[0]
          .messages
      : null

  return (
    <SelectedContactContext.Provider
      value={{
        selected,
        setSelected,
        messages,
      }}
    >
      {children}
    </SelectedContactContext.Provider>
  )
}
