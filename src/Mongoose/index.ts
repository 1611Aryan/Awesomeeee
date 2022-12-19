import mongoose from "mongoose"
import { logError, logInfo } from "../Utilities/logging.js"
import "./Cache/index.js"

const MongoConfig = async (): Promise<void> => {
  const MongoURI = process.env.MONGODB_URI || ""
  mongoose.set("strictQuery", false)
  try {
    await mongoose.connect(MongoURI)
    logInfo("Database is Connected")
  } catch (err) {
    logError("Failed to connect to MongoDB-> ", err)
  }
}

export default MongoConfig
