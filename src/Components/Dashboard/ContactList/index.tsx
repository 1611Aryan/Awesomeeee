import { contactI } from "Actions/contactsAction"
import React, { useState } from "react"

import styled from "styled-components"
import ContactPage from "../ContactPage"

import Contacts from "./Contacts"
import SearchBar from "./SearchBar"

const Conversations: React.FC<{
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowConversations }) => {
  const [searchBarBottom, setSearchBarBottom] = useState<number>()
  const [contactPageVis, setContactPageVis] = useState<{
    visible: boolean
    contact: contactI | null
  }>({
    visible: false,
    contact: null,
  })

  return (
    <StyledConversations>
      <div className="border"></div>
      <header>
        <h1>Conversations</h1>
      </header>

      <SearchBar setSearchBarBottom={setSearchBarBottom} />

      <Contacts
        searchBarBottom={searchBarBottom}
        setContactPageVis={setContactPageVis}
        setShowConversations={setShowConversations}
      />

      {contactPageVis.visible && (
        <ContactPage
          contactPageVis={contactPageVis}
          setContactPageVis={setContactPageVis}
        />
      )}
    </StyledConversations>
  )
}

const StyledConversations = styled.div`
  width: var(--conversationsWidth);

  --contactPadding: calc(var(--conversationsWidth) / 16.666);

  height: 100vh;
  padding: 0 var(--contactPadding) 0;

  position: relative;

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
      line-height: 1;
    }
  }

  .border {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(to right, #dadada88, transparent);
  }

  //Contacts
  --contactNameSize: 1em;
  --contactTextSize: 0.7em;

  @media only screen and (max-width: 500px) {
    position: fixed;
    top: 0;
    left: calc(100vw - var(--conversationsWidth));
  }
`

export default Conversations
