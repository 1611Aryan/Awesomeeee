import bcrypt from "bcrypt"
import redisClient from "../../Redis"

import User from "../../Models/user.model"

import { controller } from "../controller"

enum SETS {
  ALLOW_PASSWORD_CHANGE = "ALLOW_PASSWORD_CHANGE",
  VERIFICATION_CODE = "VERIFICATION_CODE",
}

export const getProfile: controller = async (req, res) => {
  try {
    const id = req.user.id
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
    console.log({ profile: err })
    return res.status(500).send(err)
  }
}

export const logout: controller = (req, res) => {
  req.logOut()
  res.clearCookie("JWT").sendStatus(200)
  return
}

export const verifyPassword: controller = async (req, res) => {
  try {
    const id = req.user.id
    const oldPassword = req.body.oldPassword
    const user = await User.findById(id).lean()

    const SET_NAME = SETS.ALLOW_PASSWORD_CHANGE

    const isCorrect = await bcrypt.compare(oldPassword, user.password)
    if (isCorrect) {
      redisClient.zremrangebyscore(SET_NAME, "-inf", Date.now() - 300_000)
      redisClient.zadd(SET_NAME, [Date.now(), id])

      return res.status(200).send({ success: true })
    } else return res.status(403).send({ success: false })
  } catch (err) {
    console.log({ verifyPassword: err })
    res.status(500).send(err)
  }
}

export const changePassword: controller = async (req, res) => {
  const id = req.user.id
  const newPassword = req.body.newPassword

  try {
    const SET_NAME = SETS.ALLOW_PASSWORD_CHANGE

    const isVerified = !!(await redisClient.zscore(SET_NAME, id))

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
    console.log({ changePassword: err })
    return res.status(500).send(err)
  }
}
