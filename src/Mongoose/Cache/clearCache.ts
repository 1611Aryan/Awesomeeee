import { logDebug } from "../../Utilities/logging.js"

const clearCache = async (_id: string, _collection: string): Promise<void> => {
  // const key = `${collection}:profile:${id}`
  // await redisClient.del(key)
  logDebug("Cache Cleared")
}

export default clearCache
