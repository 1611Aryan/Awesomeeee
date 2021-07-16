import { motion } from "framer-motion"

import styled from "styled-components"
import Header from "./Header"
import Input from "./Input"
import Messages from "./Messages"

const Chat: React.FC = () => {
  const variants = {
    initial: {
      y: -1000,
    },
    animate: { y: 0 },
  }

  return (
    <StyledChat variants={variants} initial="initial" animate="animate">
      <Header />
      <Messages />
      <Input />
    </StyledChat>
  )
}

const StyledChat = styled(motion.main)`
  width: var(--chatWidth);
  height: 100vh;

  background: rgba(126, 126, 126, 0.15);

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  overflow: hidden;

  --HeaderPadding: 1em;

  --HeaderFontSize: calc(var(--headerHeight) / 3);

  --InputHeight: calc(var(--conversationsWidth) / 5);
  --InputFontSize: calc(var(--HeaderFontSize) / 2);

  --MessagesHeight: calc(100vh - var(--headerHeight) - var(--InputHeight));
  --MessagesFontSize: calc(var(--conversationsWidth) * 0.044);
`

export default Chat
