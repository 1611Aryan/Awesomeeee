/* eslint-disable prefer-rest-params */
import { Query } from "mongoose"
import { logDebug } from "../../Utilities/logging.js"

import getCachedProfile, { setCachedProfile } from "./cacheprofile.js"
import clearCache from "./clearCache.js"

Query.prototype.cacheProfileById = function (id) {
  this.useCachedProfile = true
  this.id = id
  return this
}

Query.prototype.deleteCacheById = function (id) {
  clearCache(id, this.mongooseCollection.name)
  return this
}

const exec = Query.prototype.exec

Query.prototype.exec = async function () {
  if (!this.useCachedProfile) return exec.apply(this)

  const [key, cachedValue] = await getCachedProfile(
    this.id,
    this.mongooseCollection.name
  )

  if (cachedValue) {
    const document = JSON.parse(cachedValue)
    logDebug("Cache Used")

    return Array.isArray(document)
      ? document.map(d => new this.model(d))
      : new this.model(document)
  }

  const result = await exec.apply(this)
  if (this.useCachedProfile) setCachedProfile(key, result)

  return result
}
