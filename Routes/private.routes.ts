import { Router } from "express"
import multer from "multer"

import {
  addContact,
  changeProfilePicture,
  changeUsername,
  getProfile,
  autoUpdateContact,
  updateContact,
  deleteContact,
  logout,
} from "../Controllers/user.controller"

const router = Router()
const upload = multer({ dest: "uploads/" })

router.get("/profile", getProfile)

router.patch("/username", changeUsername)

router.patch("/profilePicture", upload.single("avatar"), changeProfilePicture)

router.patch("/addContact", addContact)

/*
 *Update when contact is clicked on client
 *No manual User Input required
 *For profilepicture updation
 */
router.patch("/autoUpdateContact", autoUpdateContact)

router.patch("/updateContact", updateContact)

router.patch("/deleteContact", deleteContact)

router.get("/logout", logout)

export default router
