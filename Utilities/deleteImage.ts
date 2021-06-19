import fs from "fs/promises"
import path from "path"

const deleteImage = async (imagePath: string, minified: boolean) => {
  try {
    await fs.rm(imagePath)
    if (minified) await fs.rm(`${imagePath}-min`)
  } catch (err) {
    console.log({ deleteImage: err })
  }
}

export default deleteImage
