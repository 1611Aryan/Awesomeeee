import { Request, Response } from "express-serve-static-core"
import ImageKit from "imagekit"
import path from "path"
import fs from "fs/promises"

import { v4 as uuid } from "uuid"

import User from "./../Models/user.model"
import { clearCache } from "./../Mongoose/cache"

import optimizeImage from "../Utilities/optimizeImage"
import deleteImage from "../Utilities/deleteImage"

const imagekit = new ImageKit({
  publicKey: "public_3oRfceoym6fYdLSisJvQyec8czA=",
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/qhjbxokyvp1/Messenger_2_0",
})

type req = Request & {
  user: {
    id: string
    iat: string
    username: string
  }
}

export const getProfile = async (req: req, res: Response) => {
  try {
    const id = req.user.id

    const user = await User.findById(id, { password: 0 }).cache(id).lean()

    if (user) return res.status(200).send({ user })

    return res.sendStatus(500)
  } catch (err) {
    console.log({ profile: err })
    return res.status(500).send(err)
  }
}

export const changeUsername = async (req: req, res: Response) => {
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

export const changeProfilePicture = async (req: req, res: Response) => {
  const id = req.user.id
  const imagePath = path.join(__dirname, "..", "uploads", req.file.filename)
  const mimeType = req.file.mimetype
  let minified = false

  try {
    let finalImagePath = imagePath
    if (req.file.size > 200_000) {
      await optimizeImage(imagePath, mimeType)
      finalImagePath = `${imagePath}-min`
      minified = true
    }

    const response = await imagekit.upload({
      file: await fs.readFile(finalImagePath),
      fileName: id,
      folder: "Awesome",
    })

    const profilePicture = {
      large: response.url,
      thumbnail: response.thumbnailUrl,
    }

    const user = await User.findByIdAndUpdate(id, {
      $set: {
        profilePicture,
      },
    })
    if (user) {
      clearCache(id)
      return res.status(200).send("Profile Picture Updated")
    } else return res.sendStatus(404)
  } catch (err) {
    console.log({ changeProfilePicture: err })
    return res.status(500).send(err)
  } finally {
    await deleteImage(imagePath, minified)
  }
}

export const addContact = async (req: req, res: Response) => {
  try {
    const id = req.user.id
    let roomId = uuid()
    const contactName = req.body.name
    const contactUsername = req.body.username
    try {
      const contact = await User.findOne(
        { username: contactUsername },
        { password: 0, email: 0, phone: 0 }
      ).lean()

      if (contact) {
        const mutualContact = contact.contacts
          ? contact.contacts.filter(c => c.contactId === id)
          : null

        console.log({ mutualContact })

        if (mutualContact && mutualContact[0]) {
          roomId = mutualContact[0].roomId
        }

        const user = await User.findById(id, {
          password: 0,
          email: 0,
          phone: 0,
          profilePicture: 0,
        })

        const contactExists = user.contacts.filter(
          c => c.contactId === contact._id.toString()
        )

        if (contactExists[0]) {
          return res.status(409).send({ message: "Contact Already Exists" })
        }

        await User.findByIdAndUpdate(id, {
          $push: {
            contacts: {
              name: contactName,
              contactId: contact._id.toString(),
              profilePicture: contact.profilePicture,
              roomId,
            },
          },
        }).lean()
        clearCache(id)
        return res.status(200).send({
          message: "Contact Added",
          contact: {
            name: contactName,
            contactId: contact._id,
            profilePicture: contact.profilePicture,
            roomId,
          },
        })
      } else return res.status(404).send({ message: "Incorrect Username" })
    } catch (err) {
      console.log({ addContact: err })
      return res.status(500).send(err)
    }
  } catch (err) {
    console.log(err)
  }
}
