export type endpoint = {
  URL: string
  METHOD: "get" | "post" | "patch" | "put" | "delete"
}

enum methods {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

export const WEBSOCKET_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "wss://awesomeeeee.herokuapp.com"
    : "ws://localhost:5000"

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://awesomeeeee.herokuapp.com"
    : "http://localhost:5000"

export const loginEndpoint: endpoint = {
  URL: `${baseUrl}/login`,
  METHOD: methods.POST,
}

export const googleAuth: endpoint = {
  URL: `${baseUrl}/auth/google`,
  METHOD: methods.GET,
}

export const signUpEndpoint: endpoint = {
  URL: `${baseUrl}/signup`,
  METHOD: methods.POST,
}

export const forgotPassword_step1: endpoint = {
  URL: `${baseUrl}/forgotPassword-1`,
  METHOD: methods.POST,
}

export const forgotPassword_step2: endpoint = {
  URL: `${baseUrl}/forgotPassword-2`,
  METHOD: methods.POST,
}

export const forgotPassword_step3: endpoint = {
  URL: `${baseUrl}/forgotPassword-3`,
  METHOD: methods.PATCH,
}

export const logoutEndpoint: endpoint = {
  URL: `${baseUrl}/user/logout`,
  METHOD: methods.GET,
}

export const profileSetup: endpoint = {
  URL: `${baseUrl}/user/profileSetup`,
  METHOD: methods.POST,
}

export const getProfile: endpoint = {
  URL: `${baseUrl}/user/profile`,
  METHOD: methods.GET,
}

export const updateProfilePicture: endpoint = {
  URL: `${baseUrl}/user/profilePicture`,
  METHOD: methods.PATCH,
}

export const updateUsername: endpoint = {
  URL: `${baseUrl}/user/username`,
  METHOD: methods.PATCH,
}

export const addContact: endpoint = {
  URL: `${baseUrl}/user/addContact`,
  METHOD: methods.PATCH,
}

export const autoUpdateContact: endpoint = {
  URL: `${baseUrl}/user/autoUpdateContact`,
  METHOD: methods.PATCH,
}

export const updateContact: endpoint = {
  URL: `${baseUrl}/user/updateContact`,
  METHOD: methods.PATCH,
}

export const deleteContact: endpoint = {
  URL: `${baseUrl}/user/deleteContact`,
  METHOD: methods.PATCH,
}

export const verifyPassword: endpoint = {
  URL: `${baseUrl}/user/verifyPassword`,
  METHOD: methods.POST,
}

export const changePassword: endpoint = {
  URL: `${baseUrl}/user/changePassword`,
  METHOD: methods.POST,
}
