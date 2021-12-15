import useTypedSelector from "Hooks/useTypedSelector"
import { useState } from "react"
import { contactI } from "Redux/Slices/Contact.Slice"
import styled from "@emotion/styled"

import Contact from "./Contact"
import ContactMenu from "./ContactMenu"

const Contacts: React.FC<{
  setContactPageVis: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      contact: contactI | null
    }>
  >
}> = ({ setContactPageVis }) => {
  const { contacts } = useTypedSelector(state => state.contact)

  const [menuConfig, setMenuConfig] = useState<{
    positionY: number
    openState: boolean
    contact: { contactId: string; contactName: string; roomId: string } | null
  }>({
    positionY: 0,
    openState: false,
    contact: null,
  })

  return (
    <StyledContacts>
      <ul className="contacts">
        {contacts &&
          contacts.map((contact, index) => (
            <Contact
              setContactPageVis={setContactPageVis}
              setMenuConfig={setMenuConfig}
              key={index}
              contact={contact}
            />
          ))}
      </ul>
      <ContactMenu menuConfig={menuConfig} setMenuConfig={setMenuConfig} />
    </StyledContacts>
  )
}

const StyledContacts = styled.div`
  width: 100%;
  flex: 1;

  overflow: hidden;
  .contacts {
    width: 100%;
    height: 100%;

    overflow: hidden auto;

    list-style-type: none;

    border-radius: 5px;

    &::-webkit-scrollbar {
      width: 2px;
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: #fff8;
      border-radius: 10px;
    }

    -ms-overflow-style: none;
    scrollbar-width: thin;

    background: rgba(16, 16, 16, 0.2);
    .selected {
      z-index: 0;
      transform: scale(1.02);
      background: linear-gradient(
        to right,
        rgba(255, 226, 89, 0.5),
        rgba(255, 167, 81, 0.5)
      );
    }
  }
`

export default Contacts
