import http from "http"
process.env.NODE_ENV !== "production" &&
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("dotenv").config()

import passport from "passport"

import ExpressConfig from "./Express"
import PassportConfig from "./Passport"
import chalk from "chalk"
import MongoConfig from "./Mongoose"
import socketConfig from "./Socket.io"

import Router from "./Routes/normal.routes"
import PrivateRouter from "./Routes/private.routes"
import ImageKitConfig from "./ImageKit/ImageKit.Config"
import OauthRouter from "./Routes/oauth.routes"

new PassportConfig(passport)

const PORT = process.env.PORT || 5000

const app = ExpressConfig()
app.use(passport.initialize())

const server = http.createServer(app)

socketConfig(server)
MongoConfig()
export const imagekit = ImageKitConfig()

app.use("/", Router)
app.use("/", OauthRouter)
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  PrivateRouter
)

server.listen(PORT, () =>
  console.log(chalk.green.bold(`Server running on port ${PORT}`))
)
