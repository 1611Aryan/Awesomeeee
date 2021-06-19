import sharp from "sharp"

const optimizeImage = async (imgPath: string, mimeType: string) => {
  const imageType = mimeType.split("/")[1] as "jpeg" | "webp" | "png"

  console.log({ imageType })

  try {
    await sharp(imgPath)
      .resize(1200, 1200, {
        fit: "cover",
      })
      [imageType]({ quality: 80 })
      .toFile(`${imgPath}-min`)

    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export default optimizeImage
