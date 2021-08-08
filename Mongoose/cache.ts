/* eslint-disable prefer-rest-params */
import { Query } from "mongoose"

import redisClient from "./../Redis"

declare module "mongoose" {
  interface Query<ResultType, DocType extends Document, THelpers> {
    cache(primaryKey: number | string): Query<ResultType, DocType & THelpers>
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
    console.log("Cache Used")

    return Array.isArray(document)
      ? document.map(d => new this.model(d))
      : new this.model(document)
  }

  const result = await exec.apply(this, arguments)
  await redisClient.hset(this.primaryKey, [
    key.toString(),
    JSON.stringify(result),
  ])

  return result
}

export const clearCache = async (primaryKey: unknown): Promise<void> => {
  await redisClient.del(JSON.stringify(primaryKey))
  console.log("Cache Cleared")
}
