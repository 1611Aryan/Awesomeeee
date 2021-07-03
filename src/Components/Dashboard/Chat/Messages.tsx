import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { useSelectedContact } from "../../../Providers/SelectedContactProvider"
import { rootState } from "../../../Reducers"

import Message from "./Message"

const Messages: React.FC<{}> = () => {
  const ulRef = useRef<HTMLUListElement>(null)

  const { messages } = useSelectedContact()
  const { contacts } = useSelector((state: rootState) => state)

  useEffect(() => {
    if (ulRef.current) ulRef.current.scrollTop = ulRef.current.scrollHeight
  }, [contacts])

  return (
    <StyledMessages>
      <ul ref={ulRef}>
        {messages &&
          messages.map((msg, index) => <Message key={index} message={msg} />)}
      </ul>
    </StyledMessages>
  )
}

const StyledMessages = styled.div`
  width: 100%;
  height: var(--MessagesHeight);

  ul {
    user-select: text;

    list-style-type: none;

    width: 100%;
    height: 100%;
    overflow: hidden auto;
    scroll-behavior: smooth;

    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;

    &::-webkit-scrollbar {
      width: 5px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #fff;
      border-radius: 1px;
    }
  }
`

export default Messages
