import { ExtendedError } from "socket.io/dist/namespace"
import { socketI } from "./types"

export const customUserIdMiddleware = (
  socket: socketI,
  next: (err?: ExtendedError) => void
): void => {
  socket.userId = Array.isArray(socket.handshake.query.id)
    ? socket.handshake.query.id[0]
    : socket.handshake.query.id
  next(null)
}
