import React, { useContext, createContext, useState } from "react"

const ShowContactsContext = createContext<{
  showContacts: boolean
  setShowContacts: React.Dispatch<React.SetStateAction<boolean>>
}>({
  showContacts: false,
  setShowContacts: () => {},
})

export const useShowContacts = () => useContext(ShowContactsContext)

export const ShowContactsProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [showContacts, setShowContacts] = useState(true)

  return (
    <ShowContactsContext.Provider
      value={{
        showContacts,
        setShowContacts,
      }}
    >
      {children}
    </ShowContactsContext.Provider>
  )
}
