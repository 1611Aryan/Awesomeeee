import { Router } from "express"
import multer from "multer"

import {
  addContact,
  changeProfilePicture,
  changeUsername,
  getProfile,
} from "../Controllers/user.controller"

const router = Router()
const upload = multer({ dest: "uploads/" })

router.get("/profile", getProfile)

router.patch("/username", changeUsername)

router.patch("/profilePicture", upload.single("avatar"), changeProfilePicture)

router.patch("/addContact", addContact)

export default router
