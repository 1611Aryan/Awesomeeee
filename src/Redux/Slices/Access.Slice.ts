import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type access = { loggedIn: boolean; username: null | string }

const KEY = "Messenger-access"

const accessSlice = createSlice({
  name: "access",
  initialState: JSON.parse(
    window.localStorage.getItem(KEY) ||
      JSON.stringify({
        loggedIn: false,
        username: null,
      })
  ) as access,
  reducers: {
    loginUser: (
      state,
      action: PayloadAction<{ username: access["username"] }>
    ) => {
      state.loggedIn = true
      state.username = action.payload.username
      localStorage.setItem(KEY, JSON.stringify(state))
    },
    logoutUser: state => {
      state.loggedIn = false
      state.username = null
      localStorage.removeItem(KEY)
    },
  },
})

export const { loginUser, logoutUser } = accessSlice.actions

const accessReducer = accessSlice.reducer

export default accessReducer
