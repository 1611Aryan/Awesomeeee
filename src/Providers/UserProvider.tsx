import React, { useContext, createContext, useState } from "react"

interface user {
  id: string
  username: string
  profilePicture: {
    large: string
    thumbnail: string
  }
  contacts: {
    name: user["username"]
    id: user["id"]
    profilePicture: user["profilePicture"]
  }[]
}

const UserContext = createContext<{
  user: user | null
  setUser: React.Dispatch<React.SetStateAction<user | null>>
}>({
  user: null,
  setUser: () => {},
})

export const useUser = () => useContext(UserContext)

export const UserProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [user, setUser] = useState<user | null>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
