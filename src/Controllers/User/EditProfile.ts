import { Request, Response } from "express"
import path from "path"
import { UserI } from "../../@types/express.js"
import User from "../../Models/user.model.js"
import { logError } from "../../Utilities/logging.js"
import toBoolean from "../../Utilities/toBoolean.js"

import {
  deleteImageFromDisk,
  deleteImageFromImageKit,
  optimizeImage,
  uploadImage,
} from "../Utils.js"

export const changeUsername = async (req: Request, res: Response) => {
  try {
    const { id } = req.user as UserI
    const username = req.body.username

    const existingUser = await User.findOne({ username }).lean()

    if (existingUser) return res.status(409).send("Username already Taken")

    const user = await User.findByIdAndUpdate(id, {
      $set: {
        username,
      },
    }).deleteCacheById(id)

    if (user) {
      return res.status(200).send("Username Changed")
    } else return res.sendStatus(404)
  } catch (err) {
    logError({ changeUsername: err })
    return res.status(500).send(err)
  }
}

export const changeProfilePicture = async (req: Request, res: Response) => {
  const { id } = req.user as UserI
  const isDefault = toBoolean(req.body.isDefault)
  let imagePath = "",
    mimeType = ""

  if (!req.file) return res.status(400).send({ message: "Incorrect Payload" })

  if (!isDefault) {
    imagePath = path.join(__dirname, "..", "..", "uploads", req.file.filename)
    mimeType = req.file.mimetype
  }

  const FILE_ID: string = req.body.fileId
  let minified = false

  try {
    !isDefault && deleteImageFromImageKit(FILE_ID)
    ;[minified, imagePath] = await optimizeImage(
      imagePath,
      mimeType,
      req.file.size,
      isDefault
    )

    if (!isDefault) {
      const profilePicture = await uploadImage(imagePath, id)

      const user = await User.findByIdAndUpdate(id, {
        $set: {
          profilePicture,
        },
      })
        .deleteCacheById(id)
        .lean()
      if (user) {
        return res.status(200).send({ profilePicture })
      } else return res.sendStatus(404)
    } else return res.status(400)
  } catch (err) {
    logError({ changeProfilePicture: err })
    return res.status(500).send(err)
  } finally {
    deleteImageFromDisk(imagePath, minified)
  }
}
