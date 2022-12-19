import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../../Models/user.model.js"

import { Request, Response } from "express"
import { nanoid } from "nanoid"
import sendVerificationEmail from "../../Mail/VerifyTemplate.js"

import { logError } from "../../Utilities/logging.js"

// enum SETS {
//   ALLOW_PASSWORD_CHANGE = "ALLOW_PASSWORD_CHANGE",
//   VERIFICATION_CODE = "VERIFICATION_CODE",
// }

export const forgotPassword = async (req: Request, res: Response) => {
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

    const token = jwt.sign(payload, process.env.JWT_SECRET || "")

    await sendVerificationEmail(userCheck.email, token)

    // const SET_NAME = SETS.VERIFICATION_CODE

    // const member = [
    //   {
    //     score: Date.now(),
    //     value: JSON.stringify({
    //       email,
    //       code,
    //     }),
    //   },
    // ]

    // redisClient.zRemRangeByScore(SET_NAME, "-inf", Date.now() - 300_000)
    // redisClient.zAdd(SET_NAME, member)

    return res.status(200).send({
      success: true,
      message: "Password reset link has been sent to your registered email",
    })
  } catch (err) {
    logError({
      forgotPassword: err,
    })
    return res.status(500).send(err)
  }
}

export const changePassword = async (req: Request, res: Response) => {
  const token = req.body.token
  const password = req.body.password.toString().trim()
  // const KEY = SETS.VERIFICATION_CODE
  const EX = 300_000

  try {
    if (!token || !password)
      return res.status(403).send({ message: "Incorrect Payload" })

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET || "") as {
      email: string
      code: string
    }

    if (!verifyToken) return res.sendStatus(403)

    //const { email, code } = verifyToken
    const { email } = verifyToken

    // const isVerified = Number(
    //   (await redisClient.zScore(KEY, JSON.stringify({ email, code }))) || -1
    // )
    const isVerified = -1

    if (isVerified > 0 && Date.now() - isVerified < EX) {
      // redisClient.zRem(KEY, JSON.stringify({ email, code }))
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
    logError({ changePassword: err })
    return res.status(500).send(err)
  }
  //finally {
  // redisClient.zRemRangeByScore(KEY, "-inf", Date.now() - EX)
  // }
}
