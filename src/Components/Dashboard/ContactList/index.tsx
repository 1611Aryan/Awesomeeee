import React, { useState } from "react"
import { contactI } from "Redux/Slices/Contact.Slice"

import styled from "@emotion/styled"
import ContactPage from "../ContactPage"

import Contacts from "./Contacts"
import SearchBar from "./SearchBar"
import { useShowContacts } from "Providers/ShowContactsProvider"

const ContactList: React.FC<{}> = () => {
  const [contactPageVis, setContactPageVis] = useState<{
    visible: boolean
    contact: contactI | null
  }>({
    visible: false,
    contact: null,
  })

  const { showContacts } = useShowContacts()

  return (
    <StyledContactList className={showContacts ? "" : "hideContacts"}>
      <header>
        <h1>Conversations</h1>
      </header>
      <SearchBar />
      <Contacts setContactPageVis={setContactPageVis} />
      {contactPageVis.visible && (
        <ContactPage
          contactPageVis={contactPageVis}
          setContactPageVis={setContactPageVis}
        />
      )}
    </StyledContactList>
  )
}

const StyledContactList = styled.div`
  width: var(--conversationsWidth);
  height: 100%;

  padding: 0 1rem 1rem;

  position: relative;

  display: flex;
  flex-direction: column;

  header {
    height: var(--headerHeight);
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    h1 {
      color: white;
      font-family: var(--fontHeading);
      font-weight: 500;
      font-size: clamp(1.25em, 3vw, 1.5em);
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 2px;
    height: 98%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      #dadada88,
      transparent 100%
    );
  }

  //Contacts
  --contactNameSize: 1em;
  --contactTextSize: 0.7em;

  @media only screen and (max-width: 500px) {
    width: 100%;
    padding: 0 1.25rem 1rem;

    &::after {
      display: none;
    }
  }
`

export default ContactList
