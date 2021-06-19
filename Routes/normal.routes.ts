import { Router } from "express"
import { Document } from "mongoose"
import jwt from "jsonwebtoken"

import passport from "passport"
import User, { UserI } from "../Models/user.model"

const router = Router()

router.get("/", async (_req, res) => {
  try {
    const users = await User.find(
      {},
      { password: 0, profilePicture: 0, contacts: 0 }
    )
    return res.status(200).send(users)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post("/signup", (req, res) =>
  passport.authenticate("signup", async (err, user: UserI, info) => {
    if (err) {
      if (typeof err === "number") return res.sendStatus(err)
      if (err.status && err.message && typeof err.status === "number")
        return res.status(err.status).send(err.message)
      return res.send(err)
    }
    if (info && info.message) return res.status(409).send(info.message)
    return res.send(true)
  })(req, res)
)

router.post("/login", (req, res) =>
  passport.authenticate("login", async (err, user: UserI & Document, info) => {
    if (err) {
      if (typeof err === "number") return res.sendStatus(err)
      if (err.status && err.message && typeof err.status === "number")
        return res.status(err.status).send(err.message)
      return res.send(err)
    }
    if (info && info.message) return res.status(400).send(info.message)
    else {
      req.logIn(user, { session: false }, async err => {
        if (err) res.send(err)
        const payload = {
          id: user._id,
          username: user.username,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET)
        console.log(token, payload, process.env.JWT_SECRET)
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
    }
  })(req, res)
)

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
