import path from "path"

import { controller } from "../controller"

import bcrypt from "bcrypt"
import User from "../../Models/user.model"

import { Response } from "express"
import { optimizeImage, uploadImage } from "../Utils"

const verifyUsername = async (username: string, res: Response) => {
  return await User.findOne({ username })
}

const genProfilePicture = async (file: Express.Multer.File, id: string) => {
  try {
    const imagePath = path.join(__dirname, "..", "..", "uploads", file.filename)
    const mimeType = file.mimetype

    const [, newImagePath] = await optimizeImage(imagePath, mimeType, file.size)

    return await uploadImage(newImagePath, id)
  } catch (err) {
    throw new Error(err)
  }
}

export const profileSetup: controller = async (req, res) => {
  const id = req.user.id
  const username: string | undefined = req.body.username
  const password: string | undefined = req.body.password

  const file: Express.Multer.File | null = req.file || null

  try {
    if (!username) return res.status(400).send({ message: "Incorrect Payload" })

    if (await verifyUsername(username, res))
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
    console.log({ finishSetup: err })
    return res.status(500).send(err)
  }
}
