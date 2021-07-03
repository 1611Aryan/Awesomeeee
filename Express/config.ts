import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import cookieParser from "cookie-parser"

const ExpressConfig = (): express.Application => {
  const app = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(
    cors({
      origin: [
        "https://messenger1.netlify.app",
        "http://localhost:3000",
        "http://localhost:53275",
      ],
      credentials: true,
    })
  )
  app.use(helmet())
  app.use(cookieParser())
  app.use(morgan("tiny"))

  return app
}

export default ExpressConfig
