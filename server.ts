import http from "http"
process.env.NODE_ENV !== "production" &&
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config()

import passport from "passport"

import ExpressConfig from "./Express/config"
import PassportConfig from "./Passport/passport.config"
import MongoConfig from "./Mongoose/config"
import socketConfig from "./Socket.io/socket.config"

import Router from "./Routes/normal.routes"
import PrivateRouter from "./Routes/private.routes"

new PassportConfig(passport).init()

const PORT = process.env.PORT || 5000

const app = ExpressConfig()
app.use(passport.initialize())

const server = http.createServer(app)

socketConfig(server)
MongoConfig()

app.use("/", Router)
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  PrivateRouter
)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
