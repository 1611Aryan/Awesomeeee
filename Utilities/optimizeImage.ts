import sharp from "sharp"

const optimizeImage = async (
  isDefault: boolean,
  imgPath: string,
  mimeType: string,
  size: number
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

export default optimizeImage
