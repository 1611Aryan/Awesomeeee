import fs from "fs/promises"

import { UserI } from "./../Models/user.model"

import { DEFAULT_PROFILE_IMAGE } from "../Utilities/Endpoints"

import { imagekit } from "../server"

import sharp from "sharp"

export const uploadImage = async (
  imagePath: string,
  id: string
): Promise<UserI["profilePicture"]> => {
  try {
    const response = await imagekit.upload({
      file: await fs.readFile(imagePath),
      fileName: id,
      folder: "Awesome",
    })

    return {
      large: response.url,
      thumbnail: response.thumbnailUrl,
      fileId: response.fileId,
    }
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteImageFromDisk = (
  imagePath: string,
  minified: boolean
): void => {
  if (imagePath)
    if (minified) {
      fs.rm(imagePath)
      fs.rm(imagePath.slice(0, -4))
    } else fs.rm(imagePath)
}

export const deleteImageFromImageKit = (FILE_ID: string): void => {
  if (
    FILE_ID !== DEFAULT_PROFILE_IMAGE.FILE_ID &&
    !FILE_ID.includes("google-")
  ) {
    imagekit.deleteFile(FILE_ID, (err, result) => {
      if (err) console.log({ imageKitDelete: err })
      else console.log({ result })
    })
  }
  return
}

export const optimizeImage = async (
  imgPath: string,
  mimeType: string,
  size: number,
  isDefault?: boolean
): Promise<[boolean, string]> => {
  if (isDefault) return [false, ""]

  const imageType = mimeType.split("/")[1] as "jpeg" | "webp" | "png"

  if (size < 200_000) {
    return [false, imgPath]
  }

  try {
    const newImagePath = `${imgPath}-min`
    await sharp(imgPath)
      .resize(1200, 1200, {
        fit: "cover",
      })
      // eslint-disable-next-line no-unexpected-multiline
      [imageType]({ quality: 80 })
      .toFile(newImagePath)

    return [true, newImagePath]
  } catch (err) {
    console.log({ optimize: err })
    return [false, imgPath]
  }
}
