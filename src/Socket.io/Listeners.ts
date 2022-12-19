import { ServerI, SocketI } from "../@types/socket.js"
import { logDebug } from "../Utilities/logging.js"

import User from "./User.js"

export const users = new User()

export const joinRoomListener = (_io: ServerI, socket: SocketI): void => {
  socket.on("joinRoom", (room: string) => {
    socket.join(room)
    socket.broadcast.to(room).emit("online", {
      contactId: users.getUser(socket.id)?.userId,
      status: true,
    })
    const activeContacts = users.getActiveContacts({
      rooms: room,
      myId: socket.id,
    })
    activeContacts &&
      activeContacts.forEach(activeContact => {
        socket.emit("online", {
          contactId: activeContact,
          status: true,
        })
      })
  })
}

export const leaveRoomListener = (_io: ServerI, socket: SocketI): void => {
  socket.on("leaveRoom", (room: string) => {
    socket.leave(room)
    socket.broadcast.to(room).emit("online", {
      contactId: users.getUser(socket.id)?.userId,
      status: false,
    })
  })
}

export const sendMessageListener = (_io: ServerI, socket: SocketI): void => {
  socket.on(
    "sendMessage",
    (
      { message, sender }: { message: string; sender: string },
      roomId: string,
      contactId: string
    ): void => {
      if (users.isOnline(contactId))
        socket.broadcast
          .to(roomId)
          .emit("recieveMessage", { roomId, message, sender })
      else logDebug("Queue")
      return
    }
  )
}

export const disconnectListener = (_io: ServerI, socket: SocketI): void => {
  socket.on("disconnect", (): void => {
    users.getUser(socket.id)?.rooms.forEach(room =>
      socket.broadcast.to(room).emit("online", {
        contactId: users.getUser(socket.id)?.userId,
        status: false,
      })
    )
    users.removeUser(socket.id)
    logDebug("Disconnected")
  })
}
