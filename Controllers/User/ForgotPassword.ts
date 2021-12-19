import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import redisClient from "../../Redis"

import User from "../../Models/user.model"

// import transporter, { sender } from "../../NodeMailer"

import { nanoid } from "nanoid"
import { controller } from "../controller"
import sendVerificationEmail from "../../Mail/VerifyTemplate"

enum SETS {
  ALLOW_PASSWORD_CHANGE = "ALLOW_PASSWORD_CHANGE",
  VERIFICATION_CODE = "VERIFICATION_CODE",
}

export const forgotPassword: controller = async (req, res) => {
  try {
    const email = req.body.email.trim() as string

    const userCheck = await User.findOne({
      $or: [
        {
          username: email,
        },
        { email },
      ],
    }).lean()

    if (!userCheck)
      return res.status(404).send({ message: "Email/Username Doesn't Exist" })

    const code = nanoid(15)

    const payload = {
      email,
      code,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    await sendVerificationEmail(userCheck.email, token)

    const SET_NAME = SETS.VERIFICATION_CODE

    redisClient.zremrangebyscore(SET_NAME, "-inf", Date.now() - 300_000)
    redisClient.zadd(SET_NAME, [
      Date.now(),
      JSON.stringify({
        email,
        code,
      }),
    ])

    return res.status(200).send({
      success: true,
      message: "Password reset link has been sent to your registered email",
    })
  } catch (err) {
    console.log({
      forgotPassword: err,
    })
    return res.status(500).send(err)
  }
}

export const changePassword: controller = async (req, res) => {
  const token = req.body.token
  const password = req.body.password.toString().trim()
  const KEY = SETS.VERIFICATION_CODE
  const EX = 300_000

  try {
    if (!token || !password)
      return res.status(403).send({ message: "Incorrect Payload" })

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET) as {
      email: string
      code: string
    }

    if (!verifyToken) return res.sendStatus(403)

    const { email, code } = verifyToken

    const isVerified = Number(
      await redisClient.zscore(KEY, JSON.stringify({ email, code })) || -1
    )

    console.log(isVerified)

    if (isVerified>0 &&    Date.now() - isVerified < EX) {
      redisClient.zrem(KEY, JSON.stringify({ email, code }))
      const hashedPassword = await bcrypt.hash(password, 10)
      await User.findOneAndUpdate(
        { $or: [{ username: email }, { email }] },
        {
          $set: {
            password: hashedPassword,
          },
        }
      ).lean()
      return res
        .status(200)
        .send({ success: true, message: "Password Updated" })
    } else return res.status(404).send({ message: "Incorrect Code" })
  } catch (err) {
    console.error({ changePassword: err })
    return res.status(500).send(err)
  } finally {
    redisClient.zremrangebyscore(KEY, "-inf", Date.now() - EX)
  }
}
