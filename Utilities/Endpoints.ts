export const GOOGLE_LOGIN_CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? "https://awesomeeeee.herokuapp.com/login/google/callback"
    : "http://localhost:5000/login/google/callback"

export const GOOGLE_SIGNUP_CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? "https://awesomeeeee.herokuapp.com/signup/google/callback"
    : "http://localhost:5000/signup/google/callback"

export const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://messenger1.netlify.app"
    : "http://localhost:3000"

export const IMAGEKIT_ENDPOINT =
  "https://ik.imagekit.io/qhjbxokyvp1/Messenger_2_0"

export const DEFAULT_PROFILE_IMAGE = {
  LARGE:
    "https://ik.imagekit.io/qhjbxokyvp1/Awesome/60f72db2be757d634eaabcb9_5FcCsyuLJx",
  THUMBNAIL:
    "https://ik.imagekit.io/qhjbxokyvp1/tr:n-media_library_thumbnail/Awesome/60f72db2be757d634eaabcb9_5FcCsyuLJx",
  FILE_ID: "60fdc0330031f0032c4968bf",
}
