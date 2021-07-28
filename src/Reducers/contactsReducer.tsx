import * as contactsAction from "./../Actions/contactsAction"

type func = (
  contacts: contactsAction.contactI[] | null,
  action: {
    type: contactsAction.actionsContacts
    payload: contactsAction.payload
  }
) => contactsAction.contactI[] | null

const setContacts: func = (_contacts, action) => {
  if (action.payload.contacts) return [...action.payload.contacts]
  else throw new Error("Incorrect Payload")
}

const addMessage: func = (contacts, action) => {
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
}

const addContact: func = (contacts, action) => {
  if (action.payload.newContact)
    return contacts
      ? [...contacts, action.payload.newContact]
      : [action.payload.newContact]
  else throw new Error("Incorrect Payload")
}

const changeContactStatus: func = (contacts, action) => {
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
}

const updateContact: func = (contacts, action) => {
  if (
    action.payload.updatedContacts &&
    action.payload.updatedContacts.contactId &&
    action.payload.updatedContacts.properties
  ) {
    return (
      contacts &&
      contacts.map(contact => {
        if (contact.contactId === action.payload.updatedContacts.contactId) {
          action.payload.updatedContacts.properties.forEach(property => {
            contact[property.key] = property.value
          })
        }

        return contact
      })
    )
  } else throw new Error("Incorrect Payload")
}

const deleteContact: func = (contacts, action) => {
  if (action.payload.deletedContactId)
    return (
      contacts &&
      contacts.filter(
        contact => contact.contactId !== action.payload.deletedContactId
      )
    )
  else throw new Error("Incorrect Payload")
}

const contactsReducer: func = (contacts, action) => {
  switch (action.type) {
    case contactsAction.actionsContacts.SET_CONTACTS:
      return setContacts(contacts, action)

    case contactsAction.actionsContacts.ADD_MESSAGE:
      return addMessage(contacts, action)

    case contactsAction.actionsContacts.ADD_CONTACT:
      return addContact(contacts, action)

    case contactsAction.actionsContacts.CHANGE_CONTACT_STATUS:
      return changeContactStatus(contacts, action)

    case contactsAction.actionsContacts.UPDATE_CONTACT:
      return updateContact(contacts, action)

    case contactsAction.actionsContacts.DELETE_CONTACT:
      return deleteContact(contacts, action)

    default:
      return contacts ? contacts : null
  }
}

export default contactsReducer
