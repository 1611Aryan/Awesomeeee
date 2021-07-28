/* eslint-disable @typescript-eslint/no-extra-semi */
import { Request, Response } from "express-serve-static-core"
import ImageKit from "imagekit"
import path from "path"
import fs from "fs/promises"

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

const imagekit = new ImageKit({
  publicKey: "public_3oRfceoym6fYdLSisJvQyec8czA=",
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_ENDPOINT,
})

const SET_NAME = "PASSWORD_VERIFIED"

type req = Request & {
  user: {
    id: string
    iat: string
    username: string
  }
}

type controller = (req: req, res: Response) => Promise<Response>

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

    const SET_NAME = "PASSWORD_VERIFIED"

    const isCorrect = await bcrypt.compare(oldPassword, user.password)
    if (isCorrect) {
      redisClient.sadd(SET_NAME, id)
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
    const isVerified = !!redisClient.sismember("passwordChangeAllowed", id)
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
  } finally {
    const res = await redisClient.srem(SET_NAME, id)
    console.log(res)
  }
}

export const logout = (req: req, res: Response): void => {
  req.logOut()
  res.sendStatus(200)
  return
}
