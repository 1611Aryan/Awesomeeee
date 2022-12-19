import { SocketI } from "../@types/socket.js"

export const customUserIdMiddleware = (
  socket: SocketI,
  next: (err?: any) => void
): void => {
  socket.data.userId = Array.isArray(socket.handshake.query.id)
    ? socket.handshake.query.id[0]
    : socket.handshake.query.id
  next(null)
}
