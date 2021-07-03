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

const baseUrl =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000"

export const updateContact: endpoint = {
  URL: `${baseUrl}/user/updateContact`,
  METHOD: methods.PATCH,
}

export const deleteContact: endpoint = {
  URL: `${baseUrl}/user/deleteContact`,
  METHOD: methods.PATCH,
}
