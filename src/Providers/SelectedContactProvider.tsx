import useTypedSelector from "Hooks/useTypedSelector"
import React, { useContext, createContext, useState } from "react"

import { contactI } from "Redux/Slices/Contact.Slice"

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
  messages: [],
})

export const useSelectedContact = () => useContext(SelectedContactContext)

export const SelectedContactProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [selected, setSelected] = useState<selectedI | null>(null)

  const { contacts } = useTypedSelector(state => state.contact)

  const messages = selected
    ? contacts.filter(contact => contact.roomId === selected.roomId)[0].messages
    : []

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
