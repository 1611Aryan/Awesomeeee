import { Query } from "mongoose"
import { createNodeRedisClient } from "handy-redis"

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379"
const redisClient = createNodeRedisClient(redisUrl)

redisClient.nodeRedis.on("connect", () =>
  console.log("Redis Server is Connected")
)

redisClient.nodeRedis.on("error", err => {
  console.error(err)
})

declare module "mongoose" {
  interface Query<ResultType, DocType extends Document, THelpers = {}> {
    cache(primaryKey: number | string): Query<ResultType, Document & THelpers>
    useCache: boolean
    primaryKey: number | string
  }
}

Query.prototype.cache = function (primaryKey) {
  this.useCache = true
  this.primaryKey = JSON.stringify(primaryKey)
  return this
}

const exec = Query.prototype.exec

Query.prototype.exec = async function () {
  if (!this.useCache) return exec.apply(this, arguments)

  const key = JSON.stringify({
    query: { ...this.getQuery() },
    collection: this.mongooseCollection.name,
  })

  const cachedValue = await redisClient.hget(this.primaryKey, key)

  if (cachedValue) {
    const document = JSON.parse(cachedValue)

    return Array.isArray(document)
      ? document.map(d => new this.model(d))
      : new this.model(document)
  }

  const result = await exec.apply(this, arguments)
  await redisClient.hset(this.primaryKey, [key, JSON.stringify(result)])

  return result
}

export const clearCache = async (primaryKey: any) => {
  await redisClient.del(JSON.stringify(primaryKey))
  console.log("Cache Cleared")
}
