import { AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FaUserPlus } from "react-icons/fa"
import styled from "styled-components"
import Modal from "./Modal"

const AddContact = () => {
  const [addContact, setAddContact] = useState(false)

  const clickHandler = () => {
    setAddContact(true)
  }

  return (
    <StyledAddContact>
      <FaUserPlus onClick={clickHandler} />
      <AnimatePresence>
        {addContact && <Modal setAddContact={setAddContact} />}
      </AnimatePresence>
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
