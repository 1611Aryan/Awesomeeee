import bcrypt from "bcrypt"
import { Request, Response } from "express"
import { UserI } from "../../@types/express.js"

import User from "../../Models/user.model.js"
import { redisClient } from "../../server.js"
import { logError } from "../../Utilities/logging.js"

enum SETS {
  ALLOW_PASSWORD_CHANGE = "ALLOW_PASSWORD_CHANGE",
  VERIFICATION_CODE = "VERIFICATION_CODE",
}

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as UserI
    const user = await User.findById(id, { password: 0 })
      .cacheProfileById(id)
      .lean()

    if (user)
      return res.status(200).send({
        user: {
          username: user.username,
          email: user.email,
          phone: user.phone,
          profilePicture: user.profilePicture,
          _id: user._id,
          profileSetup: user.profileSetup,
          strategyUsed: user.strategyUsed,
        },
        contacts: user.contacts,
      })

    return res.sendStatus(500)
  } catch (err) {
    //console.log(err)
    logError({ profile: err })
    return res.status(500).send(err)
  }
}

export const logout = async (req: Request, res: Response) => {
  req.logOut(() => {})
  res.clearCookie("JWT").sendStatus(200)
  return
}

export const verifyPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as UserI
    const oldPassword = req.body.oldPassword
    const user = await User.findById(id).lean()

    if (!user) return res.status(403).send({ message: "User Not Found" })

    const SET_NAME = SETS.ALLOW_PASSWORD_CHANGE

    const isCorrect = await bcrypt.compare(oldPassword, user.password)
    if (isCorrect) {
      redisClient.zRemRangeByScore(SET_NAME, "-inf", Date.now() - 300_000)
      redisClient.zAdd(SET_NAME, [{ score: Date.now(), value: id }])

      return res.status(200).send({ success: true })
    } else return res.status(403).send({ success: false })
  } catch (err) {
    logError({ verifyPassword: err })
    return res.status(500).send(err)
  }
}

export const changePassword = async (req: Request, res: Response) => {
  const { id } = req.user as UserI
  const newPassword = req.body.newPassword

  try {
    const SET_NAME = SETS.ALLOW_PASSWORD_CHANGE

    const isVerified = !!(await redisClient.zScore(SET_NAME, id))

    if (isVerified) {
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      await User.findByIdAndUpdate(id, {
        $set: {
          password: hashedPassword,
        },
      }).lean()
      return res.status(200).send({ message: "Password Updated" })
    } else return res.sendStatus(404)
  } catch (err) {
    logError({ changePassword: err })
    return res.status(500).send(err)
  }
}
