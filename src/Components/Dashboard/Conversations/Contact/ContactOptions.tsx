import React, { useRef } from "react"
import { BsThreeDotsVertical } from "react-icons/bs"
import styled from "styled-components"
import { contactI } from "Actions/contactsAction"

const ContactOptions: React.FC<{
  contact: contactI
  setMenuConfig: React.Dispatch<
    React.SetStateAction<{
      positionY: number
      openState: boolean
      contact: {
        contactId: string
        contactName: string
        roomId: string
      } | null
    }>
  >
}> = ({ setMenuConfig, contact }) => {
  const optionsRef = useRef<HTMLDivElement>(null)

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (optionsRef.current) {
      let bottom = optionsRef.current.getBoundingClientRect().bottom
      const menuHeight = window.innerHeight / 10
      const minPadding = 10
      if (bottom + menuHeight + minPadding >= window.innerHeight)
        bottom -= bottom + menuHeight + minPadding - window.innerHeight

      setMenuConfig(menuConfig => ({
        ...menuConfig,
        positionY: bottom,
        openState: true,
        contact: {
          contactId: contact.contactId,
          contactName: contact.name,
          roomId: contact.roomId,
        },
      }))
    }
    e.stopPropagation()
  }

  return (
    <StyledOptions ref={optionsRef} onClick={clickHandler}>
      <BsThreeDotsVertical />
    </StyledOptions>
  )
}

const StyledOptions = styled.div`
  font-size: var(--contactNameSize);
  color: #fffd;
  cursor: pointer;

  transform: scale(1.2);

  position: relative;
`

export default ContactOptions
