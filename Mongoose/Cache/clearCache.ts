import redisClient from "../../Redis"

const clearCache = async (id: string, collection: string): Promise<void> => {
  const key = `${collection}:profile:${id}`
  await redisClient.del(key)
  console.log("Cache Cleared")
}

export default clearCache
