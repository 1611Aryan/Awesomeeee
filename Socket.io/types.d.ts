import { Socket } from "socket.io"

type socketI = {
  userId: string
  handshake: {
    query: {
      id: string
      rooms: string
    }
  }
} & Socket

type user = {
  socketId: string
  userId: string
  rooms: string[]
}
