import * as userActions from "./../Actions/userActions"

const UserReducer = (
  user: userActions.userI | null,
  action: {
    type: userActions.actionsUser
    payload: userActions.payload
  }
) => {
  switch (action.type) {
    case userActions.actionsUser.ADD_USER:
      if (action.payload.user)
        return {
          ...action.payload.user,
        }
      else throw new Error("Incorrect Payload")

    case userActions.actionsUser.UPDATE_USER:
      if (action.payload.property.key && action.payload.property.value)
        return user
          ? {
              ...user,
              [action.payload.property.key]: action.payload.property.value,
            }
          : null
      else throw new Error("Incorrect Payload")

    default:
      return user ? user : null
  }
}

export default UserReducer
