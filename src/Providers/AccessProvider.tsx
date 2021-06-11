import React, { useContext, createContext } from "react"

import useLocalStorage from "../Hooks/useLocalStorage"

const AccessContext = createContext<{
  access: {
    loggedIn: boolean
    username: null | string
  } | null
  setAccess: React.Dispatch<
    React.SetStateAction<{
      loggedIn: boolean
      username: null | string
    } | null>
  >
}>({
  access: { loggedIn: false, username: null },
  setAccess: () => {},
})

export const useAccess = () => useContext(AccessContext)

export const AccessProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [access, setAccess] = useLocalStorage<{
    loggedIn: boolean
    username: null | string
  }>("access", {
    loggedIn: false,
    username: null,
  })

  return (
    <AccessContext.Provider value={{ access, setAccess }}>
      {children}
    </AccessContext.Provider>
  )
}
