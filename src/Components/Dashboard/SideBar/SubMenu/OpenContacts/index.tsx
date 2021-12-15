import { useShowContacts } from "Providers/ShowContactsProvider"
import { MdContacts } from "react-icons/md"

const OpenContact = () => {
  const { setShowContacts } = useShowContacts()

  const showContacts = () => {
    setShowContacts(true)
  }

  return <MdContacts onClick={showContacts} />
}
export default OpenContact
