import http from "http"
import { Server } from "socket.io"

import passport from "passport"

import ExpressConfig from "./Express/config"
import PassportConfig from "./Passport/passport.config"
import MongoConfig from "./Mongoose/config"

import Router from "./Routes/normal.routes"
import PrivateRouter from "./Routes/private.routes"

console.log(`Worker ${process.pid} started`)
new PassportConfig(passport).init()

if (process.env.NODE_ENV === "development") require("dotenv").config()

const PORT = process.env.PORT || 5000

const app = ExpressConfig()
app.use(passport.initialize())
MongoConfig()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:53275/",
      "http://localhost:3000",
      "https://messenger1.netlify.app",
    ],
    allowedHeaders: ["JWT"],
    methods: ["GET", "POST"],
    credentials: true,
  },
})

io.on("connection", socket => {
  console.log("User connected")

  socket.on("joinAll", (rooms: string[]) => {
    Array.isArray(rooms) && rooms.forEach(room => socket.join(room))
  })

  socket.on(
    "sendMessage",
    ({ message, sender }: { message: string; sender: string }, room: string) =>
      socket.broadcast
        .to(room)
        .emit("recieveMessage", room, { message, sender })
  )

  socket.on("disconnect", () => console.log("Disconnected"))
})

app.use("/", Router)
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  PrivateRouter
)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
