/* eslint-disable prefer-rest-params */
import chalk from "chalk"
import { Query } from "mongoose"

import getCachedProfile, { setCachedProfile } from "./cacheprofile"

import clearCache from "./clearCache"

declare module "mongoose" {
  interface Query<ResultType, DocType extends Document, THelpers> {
    useCachedProfile: boolean
    cacheProfileById(id: string): Query<ResultType, DocType & THelpers>
    id: string
    deleteCacheById(id: string): Query<ResultType, DocType & THelpers>
  }
}

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
  if (!this.useCachedProfile) return exec.apply(this, arguments)

  const [key, cachedValue] = await getCachedProfile(
    this.id,
    this.mongooseCollection.name
  )

  if (cachedValue) {
    const document = JSON.parse(cachedValue)
    console.log(chalk.blue.bold("Cache Used"))

    return Array.isArray(document)
      ? document.map(d => new this.model(d))
      : new this.model(document)
  }

  const result = await exec.apply(this, arguments)
  if (this.useCachedProfile) setCachedProfile(key, result)

  return result
}
