import React, { useState } from "react"

import styled from "styled-components"

import Contacts from "./Contacts"
import SearchBar from "./SearchBar"

const Conversations: React.FC = () => {
  const [searchBarBottom, setSearchBarBottom] = useState<number>()

  return (
    <StyledConversations>
      <div className="border"></div>
      <header>
        <h1>Conversations</h1>
      </header>

      <SearchBar setSearchBarBottom={setSearchBarBottom} />

      <Contacts searchBarBottom={searchBarBottom} />
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
      font-size: var(--headingSize);
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
  --contactNameSize: calc(var(--conversationsWidth) * 0.052);
  --contactTextSize: calc(var(--conversationsWidth) * 0.037);
  --contactImageSize: calc((var(--conversationsWidth) - 1.3em) / 6.5);
`

export default Conversations
