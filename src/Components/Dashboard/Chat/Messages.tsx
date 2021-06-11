import { useEffect, useRef } from "react"
import styled from "styled-components"
import Message from "./Message"

const Messages: React.FC<{
  messages: {
    message: string
    sender: "me" | "contact"
  }[]
}> = ({ messages }) => {
  const ulRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (ulRef.current) ulRef.current.scrollTop = ulRef.current?.scrollHeight
  }, [messages])

  return (
    <StyledMessages>
      <ul ref={ulRef}>
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
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
