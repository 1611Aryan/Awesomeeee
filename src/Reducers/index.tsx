import UserReducer from "./userReducer"

import { combineReducers } from "redux"
import { userI } from "../Actions/userActions"

import { contactI } from "../Actions/contactsAction"
import contactsReducer from "./contactsReducer"

const reducers = combineReducers({
  user: UserReducer,
  contacts: contactsReducer,
})

export type rootState = {
  user: userI | null
  contacts: contactI[] | null
}

export default reducers
