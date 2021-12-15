import { getProfile } from "API_Endpoints"
import axios from "axios"
import { contactI } from "Redux/Slices/Contact.Slice"
import { userI } from "Redux/Slices/User.Slice"

export const GetProfile = async (): Promise<
  [userI, contactI[], string[] | null]
> => {
  try {
    const res = await axios[getProfile.METHOD]<{
      user: userI
      contacts: contactI[]
    }>(getProfile.URL, {
      withCredentials: true,
    })

    const rooms = res.data.contacts
      ? res.data.contacts.map(contact => contact.roomId)
      : null

    return [res.data.user, res.data.contacts, rooms]
  } catch (err: any) {
    throw err
  }
}
