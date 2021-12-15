import { WEBSOCKET_ENDPOINT } from "API_Endpoints"
import React, { useContext, createContext, useState } from "react"
import { io, Socket } from "socket.io-client"

const SocketContext = createContext<{
  socket: Socket | null
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>
  connectSocket: ({ id, rooms }: { id: string; rooms: string }) => void
}>({ socket: null, setSocket: () => {}, connectSocket: () => {} })

export const useSocket = () => useContext(SocketContext)

export const SocketProvider: React.FC<{
  children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  const connectSocket = ({ id, rooms }: { id: string; rooms: string }) => {
    setSocket(() =>
      io(WEBSOCKET_ENDPOINT, {
        transports: ["websocket"],
        query: {
          id,
          rooms: rooms,
        },
      })
    )
  }

  return (
    <SocketContext.Provider value={{ socket, setSocket, connectSocket }}>
      {children}
    </SocketContext.Provider>
  )
}
