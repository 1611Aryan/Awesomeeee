import chalk from "chalk"
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
    console.log(chalk.green.bold("Database is Connected"))
  )
}

export default MongoConfig
