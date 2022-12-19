import http from "http"
import { Server } from "socket.io"
import { ServerI } from "../@types/socket.js"

import { CLIENT_URL } from "../Utilities/Endpoints.js"
import { logDebug } from "../Utilities/logging.js"
import {
  disconnectListener,
  joinRoomListener,
  leaveRoomListener,
  sendMessageListener,
  users,
} from "./Listeners.js"
import { customUserIdMiddleware } from "./Middlewares.js"

const corsConfig = {
  origin: CLIENT_URL,
  allowedHeaders: ["JWT"],
  methods: ["GET", "POST"],
  credentials: true,
}

const socketConfig = (server: http.Server): void => {
  const io: ServerI = new Server(server, {
    cors: corsConfig,
  })

  io.use(customUserIdMiddleware)

  io.on("connection", socket => {
    logDebug("User connected")

    //const rooms: string[] = JSON.parse(socket.handshake.query.rooms)
    const rooms = [""]
    users.addUser({
      userId: socket.data.userId || "",
      socketId: socket.id,
      rooms,
    })

    rooms &&
      rooms.forEach(room => {
        socket.join(room)
        socket.broadcast.to(room).emit("online", {
          contactId: users.getUser(socket.id)?.userId,
          status: true,
        })
      })

    const activeContacts = users.getActiveContacts({ rooms, myId: socket.id })
    activeContacts.forEach(activeContact => {
      socket.emit("online", {
        contactId: activeContact,
        status: true,
      })
    })

    joinRoomListener(io, socket)
    sendMessageListener(io, socket)
    leaveRoomListener(io, socket)
    disconnectListener(io, socket)
  })
}

export default socketConfig
