const getCachedProfile = async (
  _id: string,
  _collection: string
): Promise<[key: string, cachedValue: string]> => {
  return ["", ""]
  // const key = `${collection}:profile:${id}`
  // const cachedValue = (await redisClient.get(key)) || ""

  // return [key, cachedValue]
}

export const setCachedProfile = async (
  _key: string,
  _result: {
    [key: string]: unknown
  }
): Promise<void> => {
  return
  // await redisClient.set(key, JSON.stringify(result))
  // await redisClient.expire(key, 86_400)
}

export default getCachedProfile
