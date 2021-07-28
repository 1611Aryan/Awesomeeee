import * as userActions from "./../Actions/userActions"

type func = (
  user: userActions.userI | null,
  action: {
    type: userActions.actionsUser
    payload: userActions.payload
  }
) => userActions.userI | null

const addUser: func = (_user, action) => {
  if (action.payload.user)
    return {
      ...action.payload.user,
    }
  else throw new Error("Incorrect Payload")
}

const updateUser: func = (user, action) => {
  if (action.payload.properties) {
    action.payload.properties.forEach(property => {
      if (user) {
        user = { ...user, [property.key]: property.value }
      }
    })

    return user
  } else throw new Error("Incorrect Payload")
}

const UserReducer: func = (user, action) => {
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
