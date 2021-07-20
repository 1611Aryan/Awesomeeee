import { Request, Response } from "express-serve-static-core"
import ImageKit from "imagekit"
import path from "path"
import fs from "fs/promises"

import { v4 as uuid } from "uuid"

import User, { contactI } from "./../Models/user.model"
import { clearCache } from "./../Mongoose/cache"

import optimizeImage from "../Utilities/optimizeImage"
import deleteImage from "../Utilities/deleteImage"
import {
  DEFAULT_PROFILE_IMAGE,
  IMAGEKIT_ENDPOINT,
} from "../Utilities/Endpoints"

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

export const getProfile = async (
  req: req,
  res: Response
): Promise<Response> => {
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
        },
        contacts: user.contacts ? user.contacts : null,
      })

    return res.sendStatus(500)
  } catch (err) {
    console.log({ profile: err })
    return res.status(500).send(err)
  }
}

export const changeUsername = async (
  req: req,
  res: Response
): Promise<Response> => {
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

export const changeProfilePicture = async (
  req: req,
  res: Response
): Promise<Response> => {
  const id = req.user.id
  const imagePath = path.join(__dirname, "..", "uploads", req.file.filename)
  const mimeType = req.file.mimetype
  let minified = false
  const oldProfilePictureFileId: string = req.body.fileId

  try {
    if (
      oldProfilePictureFileId !== DEFAULT_PROFILE_IMAGE.FILEID &&
      !oldProfilePictureFileId.includes("google-")
    ) {
      imagekit.deleteFile(oldProfilePictureFileId, (err, result) => {
        if (err) console.log(err)
        else console.log(result)
      })
    }

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
      fileId: response.fileId,
    }

    const user = await User.findByIdAndUpdate(id, {
      $set: {
        profilePicture,
      },
    })
    if (user) {
      clearCache(id)
      return res.status(200).send({ profilePicture })
    } else return res.sendStatus(404)
  } catch (err) {
    console.log({ changeProfilePicture: err })
    return res.status(500).send(err)
  } finally {
    await deleteImage(imagePath, minified)
  }
}

export const addContact = async (
  req: req,
  res: Response
): Promise<Response> => {
  const id = req.user.id
  let roomId = uuid()
  const contactName = req.body.name
  const contactUsername = req.body.username

  if (contactUsername === req.user.username) {
    return res.status(400).send({
      message: "You can't add yourself as a contact",
    })
  }

  try {
    const contact = await User.findOne(
      { username: contactUsername },
      { password: 0, email: 0, phone: 0 }
    ).lean()

    if (contact) {
      const mutualContact = contact.contacts
        ? contact.contacts.filter(c => c.contactId === id)
        : null

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

      const newContact = {
        name: contactName,
        contactId: contact._id.toString(),
        profilePicture: contact.profilePicture,
        roomId,
        lastSeen: "",
        lastMessage: "",
      }

      await User.findByIdAndUpdate(id, {
        $push: {
          contacts: newContact,
        },
      }).lean()
      clearCache(id)
      return res.status(200).send({
        message: "Contact Added",
        contact: newContact,
      })
    } else return res.status(404).send({ message: "Incorrect Username" })
  } catch (err) {
    console.log({ addContact: err })
    return res.status(500).send(err)
  }
}

/*
 *Update when contact is clicked on client
 *No manual User Input required
 *For profilepicture updation
 */
export const autoUpdateContact = async (
  req: req,
  res: Response
): Promise<Response> => {
  const existingContactInfo: contactI = req.body.contact

  const id = req.user.id
  try {
    const contact = await User.findById(existingContactInfo.contactId, {
      contacts: 0,
      password: 0,
    }).lean()

    if (
      contact.profilePicture.large ===
        existingContactInfo.profilePicture.large &&
      contact.profilePicture.thumbnail ===
        existingContactInfo.profilePicture.thumbnail
    ) {
      return res.status(200).send({ message: "Up to Date", payload: null })
    } else {
      await User.updateOne(
        { _id: id, "contacts.contactId": existingContactInfo.contactId },
        {
          $set: {
            "contacts.$.profilePicture": contact.profilePicture,
          },
        }
      ).lean()
      clearCache(id)
      return res.status(200).send({
        message: "Updating Contact",
        payload: {
          profilePicture: contact.profilePicture,
        },
      })
    }
  } catch (err) {
    console.log({ updateContact: err })
    return res.status(500).send(err)
  }
}

export const updateContact = async (
  req: req,
  res: Response
): Promise<Response> => {
  const { id } = req.user
  const contactId = req.body.contactId
  const newName = req.body.newName

  try {
    await User.findOneAndUpdate(
      { _id: id, "contacts.contactId": contactId },
      {
        $set: {
          "contacts.$.name": newName,
        },
      }
    ).lean()
    clearCache(id)

    return res.status(200).send({ message: "Contact Modified" })
  } catch (err) {
    console.log({ updateContact: err })
    return res.status(500).send(err)
  }
}

export const deleteContact = async (
  req: req,
  res: Response
): Promise<Response> => {
  const { id } = req.user
  const contactId = req.body.contactId

  try {
    await User.findOneAndUpdate(
      { _id: id, "contacts.contactId": contactId },
      {
        $pull: {
          contacts: {
            contactId,
          },
        },
      }
    ).lean()
    clearCache(id)

    return res.sendStatus(204)
  } catch (err) {
    console.log({
      deleteContact: err,
    })

    return res.status(500).send(err)
  }
}

export const logout = (req: req, res: Response): void => {
  req.logOut()
  res.sendStatus(200)
  return
}
