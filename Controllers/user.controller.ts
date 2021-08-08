/* eslint-disable @typescript-eslint/no-extra-semi */
import { Request, Response } from "express-serve-static-core"
import ImageKit from "imagekit"
import path from "path"
import fs from "fs/promises"

import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import redisClient from "./../Redis"

import User, { UserI } from "./../Models/user.model"
import { clearCache } from "./../Mongoose/cache"

import optimizeImage from "../Utilities/optimizeImage"
import deleteImage from "../Utilities/deleteImage"
import {
  DEFAULT_PROFILE_IMAGE,
  IMAGEKIT_ENDPOINT,
} from "../Utilities/Endpoints"
import toBoolean from "../Utilities/toBoolean"
import { sender, transporter } from "../NodeMailer"
import codeGen from "../Utilities/codeGen"
import { randomBytes } from "crypto"

const imagekit = new ImageKit({
  publicKey: "public_3oRfceoym6fYdLSisJvQyec8czA=",
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_ENDPOINT,
})

type req = Request & {
  user: {
    id: string
    iat: string
    username: string
  }
}

type controller = (req: req, res: Response) => Promise<Response>

enum SETS {
  ALLOW_PASSWORD_CHANGE = "ALLOW_PASSWORD_CHANGE",
  VERIFICATION_CODE = "VERIFICATION_CODE",
}

//*UTILS
const deletePreviouslyStoredImage = (FILE_ID: string) => {
  if (
    FILE_ID !== DEFAULT_PROFILE_IMAGE.FILE_ID &&
    !FILE_ID.includes("google-")
  ) {
    imagekit.deleteFile(FILE_ID, (err, result) => {
      if (err) console.log({ imageKitDelete: err })
      else console.log({ result })
    })
  }
}

const uploadImage = async (
  imagePath: string,
  id: string
): Promise<UserI["profilePicture"]> => {
  try {
    const response = await imagekit.upload({
      file: await fs.readFile(imagePath),
      fileName: id,
      folder: "Awesome",
    })

    return {
      large: response.url,
      thumbnail: response.thumbnailUrl,
      fileId: response.fileId,
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const finishProfileSetup: controller = async (req, res) => {
  const id = req.user.id
  const isDefault = toBoolean(req.body.isDefault)

  console.log(!!isDefault)

  let imagePath, mimeType

  if (!isDefault) {
    imagePath = path.join(__dirname, "..", "uploads", req.file.filename)
    mimeType = req.file.mimetype
  }

  let minified = false
  try {
    //?To check if user has never set their profile before
    const userPermissionCheck = await User.findById(id)
    if (userPermissionCheck) {
      if (!userPermissionCheck.profileSetup) {
        const username = req.body.username
        const password = req.body?.password
        const hashedPassword = await bcrypt.hash(password, 10)

        //Cancel if default don't invoke the function
        ;[minified, imagePath] = await optimizeImage(
          isDefault,
          imagePath,
          mimeType,
          req.file.size
        )

        const profilePicture = isDefault
          ? {
              fileId: DEFAULT_PROFILE_IMAGE.FILE_ID,
              thumbnail: DEFAULT_PROFILE_IMAGE.THUMBNAIL,
              large: DEFAULT_PROFILE_IMAGE.LARGE,
            }
          : await uploadImage(imagePath, id)

        const user = isDefault
          ? await User.findByIdAndUpdate(id, {
              $set: {
                username,
                password: hashedPassword,
                profileSetup: true,
              },
            })
          : await User.findByIdAndUpdate(id, {
              $set: {
                username,
                password: hashedPassword,
                profilePicture,
                profileSetup: true,
              },
            }).lean()

        if (user) {
          clearCache(id)

          return res.status(200).send({
            profileSetup: true,
            profilePicture,
          })
        } else return res.sendStatus(500)
      } else return res.sendStatus(403)
    } else return res.sendStatus(500)
  } catch (err) {
    console.log({ finishSetup: err })
    return res.status(500).send(err)
  } finally {
    deleteImage(imagePath, minified)
  }
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
        contacts: user.contacts ? user.contacts : null,
      })

    return res.sendStatus(500)
  } catch (err) {
    console.log({ profile: err })
    return res.status(500).send(err)
  }
}

export const changeUsername: controller = async (req, res) => {
  try {
    const id = req.user.id
    const username = req.body.username

    const existingUser = await User.findOne({ username }).lean()

    if (existingUser) return res.status(409).send("Username already Taken")

    const user = await User.findByIdAndUpdate(id, {
      $set: {
        username,
      },
    })

    if (user) {
      clearCache(id)
      return res.status(200).send("Username Changed")
    } else return res.sendStatus(404)
  } catch (err) {
    console.log({ changeUsername: err })
    return res.status(500).send(err)
  }
}

export const changeProfilePicture: controller = async (req, res) => {
  const id = req.user.id
  const isDefault = toBoolean(req.body.isDefault)
  let imagePath, mimeType

  if (!isDefault) {
    imagePath = path.join(__dirname, "..", "uploads", req.file.filename)
    mimeType = req.file.mimetype
  }

  const FILE_ID: string = req.body.fileId
  let minified = false

  try {
    !isDefault && deletePreviouslyStoredImage(FILE_ID)
    ;[minified, imagePath] = await optimizeImage(
      isDefault,
      imagePath,
      mimeType,
      req.file.size
    )

    if (!isDefault) {
      const profilePicture = await uploadImage(imagePath, id)

      const user = await User.findByIdAndUpdate(id, {
        $set: {
          profilePicture,
        },
      }).lean()
      if (user) {
        clearCache(id)
        return res.status(200).send({ profilePicture })
      } else return res.sendStatus(404)
    } else return res.status(400)
  } catch (err) {
    console.log({ changeProfilePicture: err })
    return res.status(500).send(err)
  } finally {
    deleteImage(imagePath, minified)
  }
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

//* Send Code to Requested Account
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

    const code = codeGen()

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
        code: randomBytes(15).toString("hex"),
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

export const logout = (req: req, res: Response): void => {
  req.logOut()
  res.clearCookie("JWT").sendStatus(200)
  return
}
