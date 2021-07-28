import { AnimatePresence } from "framer-motion"
import { lazy, Suspense, useState } from "react"
import { FaUserPlus } from "react-icons/fa"
import styled from "styled-components"
import Overlay from "Components/Loaders/Overlay/Overlay"

const Modal = lazy(() => import("./Modal"))

const AddContact = () => {
  const [addContact, setAddContact] = useState(false)

  const clickHandler = () => {
    setAddContact(true)
  }

  return (
    <StyledAddContact>
      <FaUserPlus onClick={clickHandler} />
      <Suspense fallback={<Overlay />}>
        <AnimatePresence>
          {addContact && <Modal setAddContact={setAddContact} />}
        </AnimatePresence>
      </Suspense>
    </StyledAddContact>
  )
}

const StyledAddContact = styled.div`
  color: white;
  font-size: 1.3em;

  svg {
    cursor: pointer;
  }
`

export default AddContact
