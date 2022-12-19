import { redisClient } from "../../server.js"
import { logDebug } from "../../Utilities/logging.js"

const clearCache = async (id: string, collection: string): Promise<void> => {
  const key = `${collection}:profile:${id}`
  await redisClient.del(key)
  logDebug("Cache Cleared")
}

export default clearCache
