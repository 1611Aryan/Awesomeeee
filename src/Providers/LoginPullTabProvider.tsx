import React, { useContext, createContext, useState } from "react"

const LoginPullTabContext = createContext<{
  pullTabActive: boolean
  setPullTabActive: React.Dispatch<React.SetStateAction<boolean>>
}>({
  pullTabActive: false,
  setPullTabActive: () => {},
})

export const useLoginPullTab = () => useContext(LoginPullTabContext)

export const LoginPullTabProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [pullTabActive, setPullTabActive] = useState(false)

  return (
    <LoginPullTabContext.Provider
      value={{
        pullTabActive,
        setPullTabActive,
      }}
    >
      {children}
    </LoginPullTabContext.Provider>
  )
}
