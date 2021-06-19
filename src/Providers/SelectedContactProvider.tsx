import React, { useContext, createContext, useState } from "react"
import { messagePoolI, messageI, useUser, contactI } from "./UserProvider"

export interface selectedI extends contactI {
  messages: messagePoolI["messages"]
}

const SelectedContactContext = createContext<{
  selected: selectedI | null
  setSelected: React.Dispatch<React.SetStateAction<selectedI | null>>
  messages: messagePoolI["messages"]
  addMessageToSelected: ({ message, sender }: messageI) => void
}>({
  selected: null,
  setSelected: () => {},
  messages: null,
  addMessageToSelected: () => {},
})

export const useSelectedContact = () => useContext(SelectedContactContext)

export const SelectedContactProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [selected, setSelected] = useState<selectedI | null>(null)

  const { messagePool, setMessagePool } = useUser()

  const selectedMessagePool =
    messagePool && selected
      ? messagePool.filter(m => m.name === selected.name)[0]
      : null

  const messages = selectedMessagePool ? selectedMessagePool.messages : null

  const addMessageToSelected = ({ message, sender }: messageI) =>
    setMessagePool(messagePool => {
      const selectedMessagePool =
        messagePool && selected
          ? messagePool.filter(m => m.name === selected.name)[0]
          : null

      if (selectedMessagePool) {
        selectedMessagePool.messages
          ? selectedMessagePool.messages.push({ sender, message })
          : (selectedMessagePool.messages = [{ sender, message }])

        return messagePool ? [...messagePool] : null
      } else return null
    })

  return (
    <SelectedContactContext.Provider
      value={{ selected, setSelected, messages, addMessageToSelected }}
    >
      {children}
    </SelectedContactContext.Provider>
  )
}
