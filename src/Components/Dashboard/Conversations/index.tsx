import React, { useState } from "react"
import styled from "styled-components"
import Contacts from "./Contacts"
import SearchBar from "./SearchBar"

const Conversations: React.FC<{
  selected: {
    name: string
    img: string
  } | null
  setSelected: React.Dispatch<
    React.SetStateAction<{
      name: string
      img: string
    } | null>
  >
  setSavedPosition: React.Dispatch<React.SetStateAction<number | null>>
  displacement: number
  setDisplacement: React.Dispatch<React.SetStateAction<number>>
}> = ({
  setSelected,
  selected,
  setSavedPosition,
  displacement,
  setDisplacement,
}) => {
  const [contactsHeight, setContactsHeight] = useState<number>()
  const initialWidth = window.innerWidth * 0.2 + 2

  const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.clientX && setDisplacement(e.clientX - initialWidth)
  }

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (
      displacement <= window.innerWidth * 0.23 &&
      displacement >= window.innerWidth * -0.07
    )
      setSavedPosition(displacement)
    else if (displacement > window.innerWidth * 0.23)
      setSavedPosition(window.innerWidth * 0.23)
    else if (displacement < window.innerWidth * -0.07)
      setSavedPosition(window.innerWidth * -0.07)
  }

  return (
    <StyledConversations>
      <div
        className="border"
        draggable={true}
        onDrag={dragHandler}
        onDragEnd={dragEndHandler}
      ></div>
      <h1>Conversations</h1>

      <SearchBar setContactsHeight={setContactsHeight} />

      <Contacts
        selected={selected}
        contactsHeight={contactsHeight}
        setSelected={setSelected}
      />
    </StyledConversations>
  )
}

const StyledConversations = styled.div`
  width: clamp(10vw, var(--conversationsWidth), 40vw);

  height: 100vh;
  padding: var(--topPadding) calc(var(--conversationsWidth) / 16.666) 0;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  position: relative;

  .border {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 2px;
    height: 100%;
    background: linear-gradient(to right, #dadada88, transparent);

    cursor: w-resize;
  }

  h1 {
    color: white;
    font-family: var(--fontHeading);
    font-weight: 500;
    font-size: var(--headingSize);
    line-height: 1;
  }

  //Contacts
  --contactNameSize: calc(var(--conversationsWidth) * 0.052);
  --contactTextSize: calc(var(--conversationsWidth) * 0.037);
  --contactImageSize: calc((var(--conversationsWidth) - 1.3em) / 6.5);
`

export default Conversations
