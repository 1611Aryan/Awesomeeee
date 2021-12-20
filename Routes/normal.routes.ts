import { Response, Router } from "express"
import { Document } from "mongoose"
import jwt from "jsonwebtoken"
import { createHash } from "crypto"

import passport from "passport"
import { UserI } from "../Models/user.model"
import { CLIENT_URL } from "../Utilities/Endpoints"
import {
  forgotPassword,
  changePassword,
} from "../Controllers/User/ForgotPassword"

const router = Router()

const errHandler = (
  err: { [key: string]: string },
  info: { [key: string]: string },
  res: Response
) => {
  let error = true

  if (err) {
    if (typeof err === "number") {
      res.sendStatus(err)
    } else if (err.status && err.message && typeof err.status === "number")
      res.status(err.status).send(err.message)
    else res.send(err)
  } else if (info && info.message) res.status(400).send(info.message)
  else error = false
  return error
}

const generateScript = (res: any) => {
  const script = `res = ${JSON.stringify(res)};
  window.opener.postMessage(res, '${CLIENT_URL}');
  window.close();
  `
  const hashedScript = createHash("sha256").update(script).digest("base64")

  const responseHTML = `<html><head><title>Main</title></head><body><script type="text/javascript">${script}</script></body></html>`

  return [hashedScript, responseHTML]
}

router.get("/", (_req, res) => res.redirect(CLIENT_URL))

router.post("/signup", (req, res) =>
  passport.authenticate("signup", async (err, user: UserI, info) => {
    if (errHandler(err, info, res)) return
    return res.send(true)
  })(req, res)
)

router.post("/login", (req, res) =>
  passport.authenticate("login", async (err, user: UserI & Document, info) => {
    if (errHandler(err, info, res)) return

    req.logIn(user, { session: false }, async err => {
      if (err) res.send(err)
      const payload = {
        id: user._id,
        username: user.username,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET)

      return res
        .cookie("JWT", token, {
          //7 Days
          maxAge: 604_800_000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .send({ success: true, username: user.username })
    })
  })(req, res)
)

router.post("/forgotPassword", forgotPassword)

router.patch("/changePassword", changePassword)

router.delete("/iDontFeelSoGood", (req, res) =>
  passport.authenticate("delete", (err, _user: UserI, info) => {
    if (err) {
      if (typeof err === "number") return res.sendStatus(err)
      if (err.status && err.message && typeof err.status === "number")
        return res.status(err.status).send(err.message)
      return res.send(err)
    }
    if (info.message) return res.send(info.message)
  })(req, res)
)

export default router
