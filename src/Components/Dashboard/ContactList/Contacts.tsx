import { useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { rootState } from "Reducers"
import Contact from "./Contact"
import ContactMenu from "./ContactMenu"
import { contactI } from "Actions/contactsAction"

const Contacts: React.FC<{
  searchBarBottom: number | undefined
  setContactPageVis: React.Dispatch<
    React.SetStateAction<{
      visible: boolean
      contact: contactI | null
    }>
  >
}> = ({ searchBarBottom, setContactPageVis }) => {
  const { contacts } = useSelector((state: rootState) => state)

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
    <StyledContacts theme={{ top: searchBarBottom }}>
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
  height: ${props => window.innerHeight - props.theme.top - 15}px;
  flex: 1;
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
