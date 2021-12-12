import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type userI = {
  _id: string
  username: string
  email: string
  phone: string
  profileSetup: boolean
  profilePicture: {
    large: string
    thumbnail: string
    fileId: string
  }

  strategyUsed: string
}

type properties = {
  key:
    | "email"
    | "_id"
    | "username"
    | "phone"
    | "profilePicture"
    | "strategyUsed"

  value: any
}[]

const userSlice = createSlice({
  name: "user",
  initialState: { user: null } as { user: null | userI },
  reducers: {
    addUser: (state, action: PayloadAction<userI>) => {
      state.user = action.payload
    },

    updateUser: (state, action: PayloadAction<properties>) => {
      action.payload.forEach(property => {
        if (state.user) state.user[property.key] = property.value
      })
    },
  },
})

export const { addUser, updateUser } = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer
