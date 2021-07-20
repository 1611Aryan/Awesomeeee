export const GOOGLE_CALLBACK_URL =
  process.env.NODE_ENV === "production"
    ? "https://awesomeeeee.herokuapp.com/auth/google/callback"
    : "http://localhost:5000/auth/google/callback"

export const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? "https://messenger1.netlify.app"
    : "http://localhost:3000"

export const IMAGEKIT_ENDPOINT =
  "https://ik.imagekit.io/qhjbxokyvp1/Messenger_2_0"

export const DEFAULT_PROFILE_IMAGE = {
  FILEID: "60f707d1bfac3672bcef4d3c",
  LARGE:
    "https://ik.imagekit.io/qhjbxokyvp1/Awesome/60b7fb1209590040ecfecbd9_QqTHMOAeAI",
  THUMBNAIL:
    "https://ik.imagekit.io/qhjbxokyvp1/tr:n-media_library_thumbnail/Awesome/60b7fb1209590040ecfecbd9_QqTHMOAeAI",
}
