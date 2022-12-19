import { createHash } from "crypto"
import { Response, Router } from "express"
import jwt from "jsonwebtoken"
import { Document } from "mongoose"

import passport from "passport"
import { UserI } from "../Models/user.model.js"
import { CLIENT_URL } from "../Utilities/Endpoints.js"

const OauthRouter = Router()

const generateScript = (res: any) => {
  const script = `res = ${JSON.stringify(res)};
    window.postMessage(res, '${CLIENT_URL}');
    window.close();
    `
  const hashedScript = createHash("sha256").update(script).digest("base64")

  const responseHTML = `<html><head><title>Main</title></head><body><script type="text/javascript">${script}</script></body></html>`

  return [hashedScript, responseHTML]
}

const errHandler = (
  err: { [key: string]: string },
  info: { [key: string]: string },
  res: Response
) => {
  let error = true

  if (err) {
    if (typeof err === "number") res.sendStatus(err)
    else if (err.status && err.message && typeof err.status === "number") {
      const [hashedScript, responseHTML] = generateScript(err.message)
      res
        .status(err.status)
        .header(
          "Content-Security-Policy",
          `script-src 'sha256-${hashedScript}' `
        )
        .send(responseHTML)
    } else {
      const [hashedScript, responseHTML] = generateScript(err)
      res
        .status(500)
        .header(
          "Content-Security-Policy",
          `script-src 'sha256-${hashedScript}' `
        )
        .send(responseHTML)
    }
  } else if (info && info.message) {
    const [hashedScript, responseHTML] = generateScript(info.message)
    res
      .status(400)
      .header("Content-Security-Policy", `script-src 'sha256-${hashedScript}' `)
      .send(responseHTML)
  } else error = false
  return error
}

OauthRouter.get(
  "/login/google",
  passport.authenticate("googleLogin", { scope: ["profile", "email"] })
)

OauthRouter.get("/login/google/callback", (req, res) =>
  passport.authenticate(
    "googleLogin",
    { session: false },
    async (err, user: UserI & Document, info) => {
      if (errHandler(err, info, res)) return
      const payload = {
        id: user._id,
        username: user.username,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET || "")

      const [hashedScript, responseHTML] = generateScript({
        success: true,
        username: user.username,
      })

      return res
        .status(200)
        .cookie("JWT", token, {
          maxAge: 604_800_000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .header(
          "Content-Security-Policy",
          `script-src 'sha256-${hashedScript}' `
        )
        .send(responseHTML)
    }
  )(req, res)
)

OauthRouter.get(
  "/signup/google",
  passport.authenticate("googleSignup", { scope: ["profile", "email"] })
)

OauthRouter.get("/signup/google/callback", (req, res) =>
  passport.authenticate(
    "googleSignup",
    { session: false },
    async (err, user: UserI & Document, info) => {
      if (errHandler(err, info, res)) return

      const payload = {
        id: user._id,
        username: user.username,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET || "")

      const [hashedScript, responseHTML] = generateScript({
        success: true,
        username: user.username,
      })

      return res
        .status(200)
        .cookie("JWT", token, {
          maxAge: 604_800_000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .header(
          "Content-Security-Policy",
          `script-src 'sha256-${hashedScript}' `
        )
        .send(responseHTML)
    }
  )(req, res)
)

export default OauthRouter
