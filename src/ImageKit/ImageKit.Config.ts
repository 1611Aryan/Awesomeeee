import ImageKit from "imagekit"

const IMAGEKIT_ENDPOINT = "https://ik.imagekit.io/qhjbxokyvp1"

const ImageKitConfig = (): ImageKit =>
  new ImageKit({
    publicKey: "public_3oRfceoym6fYdLSisJvQyec8czA=",
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || "",
    urlEndpoint: IMAGEKIT_ENDPOINT,
  })

export default ImageKitConfig
