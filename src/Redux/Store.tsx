import { configureStore } from "@reduxjs/toolkit"
import contactReducer from "./Slices/Contact.Slice"
import userReducer from "./Slices/User.Slice"
import accessReducer from "./Slices/Access.Slice"

const store = configureStore({
  reducer: {
    user: userReducer,
    contact: contactReducer,
    access: accessReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
