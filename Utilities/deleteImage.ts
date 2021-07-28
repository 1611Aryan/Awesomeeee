import fs from "fs/promises"

const deleteImage = async (
  imagePath: string,
  minified: boolean
): Promise<void> => {
  if (imagePath)
    try {
      if (minified) {
        await fs.rm(imagePath)
        await fs.rm(imagePath.slice(0, -4))
      } else await fs.rm(imagePath)
    } catch (err) {
      throw new Error(err)
    }
}

export default deleteImage
