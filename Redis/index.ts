import { createNodeRedisClient } from "handy-redis"

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379"
const redisClient = createNodeRedisClient(redisUrl)

redisClient.nodeRedis.on("connect", () =>
  console.log("Redis Server is Connected")
)

redisClient.nodeRedis.on("error", err => {
  console.error(err)
})
export default redisClient
