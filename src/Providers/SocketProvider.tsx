import React, { useContext, createContext, useState } from "react"
import { Socket } from "socket.io-client"

const SocketContext = createContext<{
  socket: Socket | null
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>
}>({ socket: null, setSocket: () => {} })

export const useSocket = () => useContext(SocketContext)

export const SocketProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  )
}
