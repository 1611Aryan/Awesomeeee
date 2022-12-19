import { createClient } from "redis"
import { logError, logInfo } from "../Utilities/logging.js"

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379"

const RedisConfig = async () => {
  const client = createClient({ url: redisUrl })

  client.on("error", err => {
    logError("Redis Client Error", err)
    process.kill(1)
  })

  await client.connect()
  logInfo("Redis Connected")

  return client
}

export default RedisConfig
