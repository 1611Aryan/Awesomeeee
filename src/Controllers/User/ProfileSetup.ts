import path from "path"

import bcrypt from "bcrypt"
import User from "../../Models/user.model.js"

import { Request, Response } from "express"
import { UserI } from "../../@types/express.js"
import { logError } from "../../Utilities/logging.js"
import { optimizeImage, uploadImage } from "../Utils.js"

const verifyUsername = async (username: string) => {
  return await User.findOne({ username })
}

const genProfilePicture = async (file: Express.Multer.File, id: string) => {
  try {
    const imagePath = path.join(__dirname, "..", "..", "uploads", file.filename)
    const mimeType = file.mimetype

    const [, newImagePath] = await optimizeImage(imagePath, mimeType, file.size)

    return await uploadImage(newImagePath, id)
  } catch (err) {
    logError({ genProfilePicture: err })
    return
  }
}

export const profileSetup = async (req: Request, res: Response) => {
  const { id } = req.user as UserI
  const username: string | undefined = req.body.username
  const password: string | undefined = req.body.password

  const file: Express.Multer.File | null = req.file || null

  try {
    if (!username) return res.status(400).send({ message: "Incorrect Payload" })

    if (await verifyUsername(username))
      return res.status(403).send({ message: "Username Not Available" })

    const userPermissionCheck = await User.findById(id)

    if (userPermissionCheck) {
      if (!userPermissionCheck.profileSetup) {
        if (userPermissionCheck.strategyUsed !== "local" && !password)
          return res.status(400).send({ message: "Incorrect Payload" })

        const profilePicture = file && (await genProfilePicture(file, id))

        const hashedPassword = password && (await bcrypt.hash(password, 10))

        const common = profilePicture
          ? { username, profilePicture, profileSetup: true }
          : {
              username,
              profileSetup: true,
            }

        const updateData = hashedPassword
          ? {
              ...common,
              password: hashedPassword,
            }
          : common

        await userPermissionCheck
          .updateOne({
            $set: updateData,
          })
          .deleteCacheById(id)
          .lean()

        return res.status(200).send({
          profileSetup: true,
          profilePicture: userPermissionCheck.profilePicture,
        })
      } else return res.sendStatus(403)
    } else return res.sendStatus(500)
  } catch (err) {
    logError({ finishSetup: err })
    return res.status(500).send(err)
  }
}
