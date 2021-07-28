import { Router } from "express"
import multer from "multer"

import {
  changeProfilePicture,
  finishProfileSetup,
  changeUsername,
  getProfile,
  verifyPassword,
  changePassword,
  logout,
} from "../Controllers/user.controller"

import {
  addContact,
  autoUpdateContact,
  deleteContact,
  updateContact,
} from "./../Controllers/contact.controller"

const router = Router()
const upload = multer({ dest: "uploads/" })

router.get("/profile", getProfile)

router.post("/profileSetup", upload.single("avatar"), finishProfileSetup)

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
