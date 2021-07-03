import * as contactsAction from "./../Actions/contactsAction"

const contactsReducer = (
  contacts: contactsAction.contactI[] | null,
  action: {
    type: contactsAction.actionsContacts
    payload: contactsAction.payload
  }
): contactsAction.contactI[] | null => {
  switch (action.type) {
    case contactsAction.actionsContacts.SET_CONTACTS:
      if (action.payload.contacts) return [...action.payload.contacts]
      else throw new Error("Incorrect Payload")

    case contactsAction.actionsContacts.ADD_MESSAGE:
      if (contacts && action.payload.message) {
        return contacts.map(contact => {
          if (contact.roomId === action.payload.message.roomId) {
            if (contact.messages)
              contact.messages.push({
                message: action.payload.message.message,
                sender: action.payload.message.sender,
                time: Date.now().toLocaleString(),
              })
            else
              contact.messages = [
                {
                  message: action.payload.message.message,
                  sender: action.payload.message.sender,
                  time: Date.now().toLocaleString(),
                },
              ]
          }
          return contact
        })
      } else throw new Error("Incorrect Payload")

    case contactsAction.actionsContacts.ADD_CONTACT:
      if (action.payload.newContact)
        return contacts
          ? [...contacts, action.payload.newContact]
          : [action.payload.newContact]
      else throw new Error("Incorrect Payload")

    case contactsAction.actionsContacts.CHANGE_CONTACT_STATUS:
      if (
        action.payload.contactStatus &&
        action.payload.contactStatus.contactId &&
        typeof action.payload.contactStatus.status === "boolean" &&
        contacts
      ) {
        return contacts.map(contact => {
          if (contact.contactId === action.payload.contactStatus.contactId) {
            contact.online = action.payload.contactStatus.status
          }
          return contact
        })
      } else throw new Error("Incorrect Payload")

    case contactsAction.actionsContacts.UPDATE_CONTACT:
      if (
        action.payload.updatedContacts &&
        action.payload.updatedContacts.contactId &&
        action.payload.updatedContacts.properties
      ) {
        return (
          contacts &&
          contacts.map(contact => {
            if (
              contact.contactId === action.payload.updatedContacts.contactId
            ) {
              action.payload.updatedContacts.properties.forEach(property => {
                contact[property.key] = property.value
              })
            }

            return contact
          })
        )
      } else throw new Error("Incorrect Payload")

    default:
      return contacts ? contacts : null
  }
}

export default contactsReducer
