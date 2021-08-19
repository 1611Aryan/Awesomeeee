import { AnimatePresence } from "framer-motion"
import { lazy, Suspense, useState } from "react"
import { FaUserPlus } from "react-icons/fa"
import Overlay from "Components/Loaders/Overlay/Overlay"

const Modal = lazy(() => import("./Modal"))

const AddContact = () => {
  const [addContact, setAddContact] = useState(false)

  const clickHandler = () => {
    setAddContact(true)
  }

  return (
    <div>
      <FaUserPlus onClick={clickHandler} />
      <Suspense fallback={<Overlay />}>
        <AnimatePresence>
          {addContact && <Modal setAddContact={setAddContact} />}
        </AnimatePresence>
      </Suspense>
    </div>
  )
}

export default AddContact
