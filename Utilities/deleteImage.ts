import fs from "fs/promises"

const deleteImage = async (
  imagePath: string,
  minified: boolean
): Promise<void> => {
  try {
    await fs.rm(imagePath)
    if (minified) await fs.rm(`${imagePath}-min`)
  } catch (err) {
    console.log({ deleteImage: err })
  }
}

export default deleteImage
