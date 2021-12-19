import chalk from "chalk"
import mongoose from "mongoose"
import "./Cache"

const MongoConfig = (): void => {
  const MongoURI = process.env.MONGODB_URI

  mongoose.connect(MongoURI)

  const connection = mongoose.connection

  connection.once("open", () =>
    console.log(chalk.green.bold("Database is Connected"))
  )
}

export default MongoConfig
