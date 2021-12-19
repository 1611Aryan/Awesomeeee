import path from "path"

import User from "../../Models/user.model"

import toBoolean from "../../Utilities/toBoolean"

import { controller } from "../controller"

import {
  optimizeImage,
  deleteImageFromDisk,
  deleteImageFromImageKit,
  uploadImage,
} from "../Utils"

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
    }).deleteCacheById(id)

    if (user) {
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
    console.log({ changeProfilePicture: err })
    return res.status(500).send(err)
  } finally {
    deleteImageFromDisk(imagePath, minified)
  }
}
