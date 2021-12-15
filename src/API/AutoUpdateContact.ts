import axios from "axios"
import { autoUpdateContact } from "API_Endpoints"
import { contactI } from "Redux/Slices/Contact.Slice"

const AutoUpdateContact = async (contact: contactI) => {
  try {
    return await axios[autoUpdateContact.METHOD]<{
      message: "Up to Date" | "Updating Contact"
      payload: null | {
        profilePicture: contactI["profilePicture"]
      }
    }>(
      autoUpdateContact.URL,
      {
        contact,
      },
      {
        withCredentials: true,
      }
    )
  } catch (err) {
    throw err
  }
}

export default AutoUpdateContact
