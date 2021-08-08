import mongoose from "mongoose"
import "./cache"

const MongoConfig = (): void => {
  const MongoURI = process.env.MONGODB_URI

  const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }

  mongoose.connect(MongoURI, mongoOptions)

  const connection = mongoose.connection

  connection.once("open", () =>
    console.log("\x1b[36mDatabase is Connected\x1b[0m")
  )
}

export default MongoConfig
