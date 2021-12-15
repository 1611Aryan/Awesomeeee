import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import redisClient from "../../Redis"

import User from "../../Models/user.model"

import { sender, transporter } from "../../NodeMailer"

import { nanoid } from "nanoid"
import { controller } from "../controller"

enum SETS {
  ALLOW_PASSWORD_CHANGE = "ALLOW_PASSWORD_CHANGE",
  VERIFICATION_CODE = "VERIFICATION_CODE",
}

export const getProfile: controller = async (req, res) => {
  try {
    const id = req.user.id
    const user = await User.findById(id, { password: 0 }).cache(id).lean()

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

export const forgotPassword_step1: controller = async (req, res) => {
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

    const code = nanoid(6)

    if (userCheck) {
      const options = {
        from: sender,
        to: userCheck.email,
        subject: "Password Reset - Messenger",
        html: `<body><h1>Verification Code</h1><p>${code}</p></body>`,
      }
      transporter.sendMail(options)

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
        message: "Enter the verification code sent on your registered email",
      })
    } else
      return res.status(404).send({ message: "Email/Username Doesn't Exist" })
  } catch (err) {
    console.log({
      forgotPassword: err,
    })
    return res.status(500).send(err)
  }
}

export const forgotPassword_step2: controller = async (req, res) => {
  try {
    const email = req.body.email.trim()
    const code = req.body.code.toString()

    if (code.length !== 6)
      return res.status(404).send({ message: "Incorrect Code" })

    const SET_NAME = SETS.VERIFICATION_CODE

    const isVerified = !!(await redisClient.zscore(
      SET_NAME,
      JSON.stringify({
        email,
        code,
      })
    ))
    redisClient.zremrangebyscore(SET_NAME, "-inf", Date.now() - 300_000)
    redisClient.zrem(
      SET_NAME,
      JSON.stringify({
        email,
        code,
      })
    )

    if (isVerified) {
      const SET = SETS.ALLOW_PASSWORD_CHANGE

      const payload = {
        email,
        code: nanoid(15),
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET)

      redisClient.zremrangebyscore(SET, "-inf", Date.now() - 300_000)
      redisClient.zadd(SET, [Date.now(), JSON.stringify(payload)])

      return res
        .status(200)
        .cookie("CLIENT", token, {
          //10mins
          maxAge: 600_000,
          httpOnly: true,
          sameSite: "none",
          secure: true,
        })
        .send({
          success: true,
          message: "Enter new Password",
        })
    } else return res.status(404).send({ message: "Incorrect Code" })
  } catch (err) {
    console.log({
      verifyCode: err,
    })
    return res.status(500).send(err)
  }
}

export const forgotPassword_step3: controller = async (req, res) => {
  const email = req.body.email.trim()
  const newPassword = req.body.newPassword

  const token = req.cookies["CLIENT"]

  if (!token) return res.sendStatus(500)
  try {
    const SET_NAME = SETS.ALLOW_PASSWORD_CHANGE

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET) as {
      email: string
      code: string
    }

    if (!verifyToken || !verifyToken.email || !verifyToken.code)
      return res.sendStatus(500)

    const payload = {
      email: verifyToken.email,
      code: verifyToken.code,
    }

    const isVerified = !!(await redisClient.zscore(
      SET_NAME,
      JSON.stringify(payload)
    ))

    if (isVerified) {
      const hashedPassword = await bcrypt.hash(newPassword, 10)
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
        .clearCookie("CLIENT")
        .send({ success: true, message: "Password Updated" })
    } else return res.status(404).send({ message: "Please Try Again Later" })
  } catch (err) {
    console.log({ changePassword: err })
    return res.status(500).send(err)
  }
}
