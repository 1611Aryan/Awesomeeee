import { Router } from "express"
import multer from "multer"
import { profileSetup } from "../Controllers/User/ProfileSetup.Controller"

import {
  getProfile,
  verifyPassword,
  changePassword,
  logout,
} from "../Controllers/User/User.Controller"

import {
  addContact,
  autoUpdateContact,
  deleteContact,
  updateContact,
} from "../Controllers/Contact/Contact.Controller"
import {
  changeProfilePicture,
  changeUsername,
} from "../Controllers/User/EditProfile"

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
