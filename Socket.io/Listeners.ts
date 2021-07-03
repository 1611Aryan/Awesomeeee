import { Server } from "socket.io"
import { socketI } from "./types"
import User from "./User"

export const users = new User()

export const sendMessageListener = (_io: Server, socket: socketI): void => {
  socket.on(
    "sendMessage",
    (
      { message, sender }: { message: string; sender: string },
      room: string,
      contactId: string
    ): void => {
      if (users.isOnline(contactId))
        socket.broadcast
          .to(room)
          .emit("recieveMessage", { room, message, sender })
      else console.log("Queue")
      return
    }
  )
}

export const disconnectListener = (_io: Server, socket: socketI): void => {
  socket.on("disconnect", (): void => {
    users.getUser(socket.id).rooms.forEach(room =>
      socket.broadcast.to(room).emit("online", {
        contactId: users.getUser(socket.id).userId,
        status: false,
      })
    )
    users.removeUser(socket.id)
    console.log("Disconnected")
  })
}
