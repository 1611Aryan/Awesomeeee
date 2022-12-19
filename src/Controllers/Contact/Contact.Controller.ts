/* eslint-disable @typescript-eslint/no-extra-semi */
import { Request, Response } from "express"
import { nanoid } from "nanoid"
import { UserI } from "../../@types/express.js"
import User from "../../Models/user.model.js"

import { contactI } from "../../Models/user.model.js"
import { logError } from "../../Utilities/logging.js"

export const addContact = async (req: Request, res: Response) => {
  const { id, username } = req.user as UserI
  let roomId = nanoid()
  const contactName = req.body.name
  const contactUsername = req.body.username

  if (contactUsername === username) {
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
      }).lean()

      if (!user)
        return res.status(400).send({ message: "Couldn't find the user" })

      const contactExists =
        (user.contacts &&
          user.contacts.filter(c => c.contactId === contact._id.toString())) ||
        null

      if (contactExists && contactExists[0]) {
        return res.status(409).send({ message: "Contact Already Exists" })
      }

      const newContact = {
        name: contactName,
        username: contactUsername,
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
      })
        .deleteCacheById(id)
        .lean()

      return res.status(200).send({
        message: "Contact Added",
        contact: newContact,
      })
    } else return res.status(404).send({ message: "Incorrect Username" })
  } catch (err) {
    logError({ addContact: err })
    return res.status(500).send(err)
  }
}

export const autoUpdateContact = async (req: Request, res: Response) => {
  const existingContactInfo: contactI = req.body.contact

  const { id } = req.user as UserI
  try {
    const contact = await User.findById(existingContactInfo.contactId, {
      contacts: 0,
      password: 0,
    }).lean()

    if (!contact)
      return res.status(403).send({ message: "Couldn't find the contact" })

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
      )
        .deleteCacheById(id)
        .lean()

      return res.status(200).send({
        message: "Updating Contact",
        payload: {
          profilePicture: contact.profilePicture,
        },
      })
    }
  } catch (err) {
    logError({ updateContact: err })
    return res.status(500).send(err)
  }
}

export const updateContact = async (req: Request, res: Response) => {
  const { id } = req.user as UserI
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
    )
      .deleteCacheById(id)
      .lean()

    return res.status(200).send({ message: "Contact Modified" })
  } catch (err) {
    logError({ updateContact: err })
    return res.status(500).send(err)
  }
}

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.user as UserI
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
    )
      .deleteCacheById(id)
      .lean()

    return res.sendStatus(204)
  } catch (err) {
    logError({
      deleteContact: err,
    })

    return res.status(500).send(err)
  }
}
