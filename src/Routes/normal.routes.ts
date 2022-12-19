import { Response, Router } from "express"
import jwt from "jsonwebtoken"

import passport from "passport"
import {
  changePassword,
  forgotPassword,
} from "../Controllers/User/ForgotPassword.js"
import { UserI } from "../Models/user.model.js"
import { CLIENT_URL } from "../Utilities/Endpoints.js"

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

// const generateScript = (res: any) => {
//   const script = `res = ${JSON.stringify(res)};
//   window.opener.postMessage(res, '${CLIENT_URL}');
//   window.close();
//   `
//   const hashedScript = createHash("sha256").update(script).digest("base64")

//   const responseHTML = `<html><head><title>Main</title></head><body><script type="text/javascript">${script}</script></body></html>`

//   return [hashedScript, responseHTML]
// }

router.get("/", (_req, res) => res.redirect(CLIENT_URL))

//?Signup
router.post("/signup", (req, res) => {
  passport.authenticate("signup", (err, _user: UserI, info) => {
    if (errHandler(err, info, res)) return
    return res.status(201).send(true)
  })(req, res)
})

//?Login
router.post("/", (req, res) =>
  passport.authenticate("login", async (err, user: UserI, info) => {
    if (errHandler(err, info, res)) return

    const payload = {
      id: user._id,
      username: user.username,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET || "")

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
  })(req, res)
)

//?Forgot Password
router.post("/forgotPassword", forgotPassword)

//?Change password
router.patch("/changePassword", changePassword)

//?Delete User
router.delete("/", (req, res) =>
  passport.authenticate("delete", (err, _user: UserI, info) => {
    if (err) {
      if (typeof err === "number") return res.sendStatus(err)
      if (err.status && err.message && typeof err.status === "number")
        return res.status(err.status).send(err.message)
      return res.send(err)
    }
    if (info.message) return res.send(info.message)
    return
  })(req, res)
)

export default router
