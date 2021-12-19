import redisClient from "../../Redis"

const getCachedProfile = async (
  id: string,
  collection: string
): Promise<[key: string, cachedValue: string]> => {
  const key = `${collection}:profile:${id}`
  const cachedValue = await redisClient.get(key)

  return [key, cachedValue]
}

export const setCachedProfile = async (
  key: string,
  result: {
    [key: string]: unknown
  }
): Promise<void> => {
  await redisClient.set(key, JSON.stringify(result))
  await redisClient.expire(key, 86_400)
}

export default getCachedProfile
