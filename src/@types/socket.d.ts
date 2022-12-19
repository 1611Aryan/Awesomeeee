import { Server, Socket } from "socket.io"

type ServerToClientEvents = {
  online: ({ contactId: string, status: boolean }) => void
  recieveMessage: ({ roomId: string, message: string, sender: string }) => void
}
type SocketData = {
  socketId: string
  userId: string
  rooms: string[]
}

type ClientToServerEvents = {
  joinRoom: (room: string) => void
  leaveRoom: (room: string) => void
  sendMessage: (
    { message: string, sender: string },
    roomId: string,
    contactId: string
  ) => void
}

export type ServerI = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  {},
  SocketData
>

export type SocketI = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  {},
  SocketData
>

export type user = {
  socketId: string
  userId: string
  rooms: string[]
}
