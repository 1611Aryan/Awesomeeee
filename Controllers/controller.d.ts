import { NextFunction, Request, Response } from "express"

type req = Request & {
  user: {
    id: string
    iat: string
    username: string
  }
}

declare type controller = (
  req: req,
  res: Response,
  next?: NextFunction
) => Promise<Response> | void
