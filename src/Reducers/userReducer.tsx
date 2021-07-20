import * as userActions from "./../Actions/userActions"

type reducer = {
  user: userActions.userI | null
  action: {
    type: userActions.actionsUser
    payload: userActions.payload
  }
}

const addUser = (
  _user: reducer["user"],
  action: reducer["action"]
): userActions.userI | null => {
  if (action.payload.user)
    return {
      ...action.payload.user,
    }
  else throw new Error("Incorrect Payload")
}

const updateUser = (
  user: reducer["user"],
  action: reducer["action"]
): userActions.userI | null => {
  if (action.payload.property.key && action.payload.property.value)
    return user
      ? {
          ...user,
          [action.payload.property.key]: action.payload.property.value,
        }
      : null
  else throw new Error("Incorrect Payload")
}

const UserReducer = (user: reducer["user"], action: reducer["action"]) => {
  switch (action.type) {
    case userActions.actionsUser.ADD_USER:
      return addUser(user, action)

    case userActions.actionsUser.UPDATE_USER:
      return updateUser(user, action)

    default:
      return user ? user : null
  }
}

export default UserReducer
