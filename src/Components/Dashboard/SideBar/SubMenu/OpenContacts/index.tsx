import { MdContacts } from "react-icons/md"

const OpenContact: React.FC<{
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowConversations }) => {
  const showContacts = () => {
    setShowConversations(true)
  }

  return <MdContacts onClick={showContacts} />
}
export default OpenContact
