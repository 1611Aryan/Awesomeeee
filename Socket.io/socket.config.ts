import http from "http"
import { Server } from "socket.io"
import {
  users,
  sendMessageListener,
  disconnectListener,
  joinRoomListener,
  leaveRoomListener,
} from "./Listeners"
import { customUserIdMiddleware } from "./Middlewares"
import { socketI } from "./types"

const corsConfig = {
  origin: [
    "http://localhost:53275/",
    "http://localhost:3000",
    "https://messenger1.netlify.app",
  ],
  allowedHeaders: ["JWT"],
  methods: ["GET", "POST"],
  credentials: true,
}

const socketConfig = (server: http.Server): void => {
  const io = new Server(server, {
    cors: corsConfig,
  })

  io.use(customUserIdMiddleware)

  io.on("connection", (socket: socketI) => {
    console.log("User connected")
    const rooms: string[] = JSON.parse(socket.handshake.query.rooms)
    users.addUser({
      userId: socket.userId,
      socketId: socket.id,
      rooms,
    })

    rooms &&
      rooms.forEach(room => {
        socket.join(room)
        socket.broadcast.to(room).emit("online", {
          contactId: users.getUser(socket.id).userId,
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
