import { Router } from "express"
import multer from "multer"
import { profileSetup } from "../Controllers/User/ProfileSetup.js"

import {
  changePassword,
  getProfile,
  logout,
  verifyPassword,
} from "../Controllers/User/User.Controller.js"

import {
  addContact,
  autoUpdateContact,
  deleteContact,
  updateContact,
} from "../Controllers/Contact/Contact.Controller.js"
import {
  changeProfilePicture,
  changeUsername,
} from "../Controllers/User/EditProfile.js"

const router = Router()
const upload = multer({ dest: "uploads/" })

router.get("/profile", getProfile)

router.post("/profileSetup", upload.single("avatar"), profileSetup)

router.patch("/username", changeUsername)

router.patch("/profilePicture", upload.single("avatar"), changeProfilePicture)

router.patch("/addContact", addContact)

router.post("/verifyPassword", verifyPassword)

router.post("/changePassword", changePassword)

router.patch("/autoUpdateContact", autoUpdateContact)

router.patch("/updateContact", updateContact)

router.patch("/deleteContact", deleteContact)

router.get("/logout", logout)

export default router
