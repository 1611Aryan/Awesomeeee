const config =
  process.env.NODE_ENV !== "production" ? await import("dotenv") : null
if (config) config.config()

import passport from "passport"

import ExpressConfig from "./Express/index.js"
import MongoConfig from "./Mongoose/index.js"
import PassportConfig from "./Passport/index.js"
import socketConfig from "./Socket.io/index.js"

import http from "http"
import ImageKitConfig from "./ImageKit/ImageKit.Config.js"
import RedisConfig from "./Redis/index.js"
import Router from "./Routes/normal.routes.js"
import OauthRouter from "./Routes/oauth.routes.js"
import PrivateRouter from "./Routes/private.routes.js"
import { logInfo } from "./Utilities/logging.js"

new PassportConfig(passport)

const PORT = process.env.PORT || 5000

const app = ExpressConfig()
app.use(passport.initialize())

const server = http.createServer(app)

socketConfig(server)
await MongoConfig()
export const imagekit = ImageKitConfig()
export const redisClient = await RedisConfig()

app.use(
  "/backend/user",
  passport.authenticate("jwt", { session: false }),
  PrivateRouter
)
app.use("/backend", Router)
app.use("/backend", OauthRouter)

server.listen(PORT, () => logInfo(`Server running on port ${PORT}`))
