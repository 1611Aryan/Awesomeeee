import React, { useContext, createContext } from "react"

import useLocalStorage from "../Hooks/useLocalStorage"

type access = { loggedIn: boolean; username: null | string }

const AccessContext = createContext<{
  access: access | null
  setAccess: React.Dispatch<React.SetStateAction<access | null>>
}>({
  access: { loggedIn: false, username: null },
  setAccess: () => {},
})

export const useAccess = () => useContext(AccessContext)

export const AccessProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [access, setAccess] = useLocalStorage<access>("access", {
    loggedIn: false,
    username: null,
  })

  return (
    <AccessContext.Provider value={{ access, setAccess }}>
      {children}
    </AccessContext.Provider>
  )
}
