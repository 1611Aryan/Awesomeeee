import { motion } from "framer-motion"

import styled from "@emotion/styled"
import Header from "./Header"
import Input from "./Input"
import Messages from "./Messages"
import { useShowContacts } from "Providers/ShowContactsProvider"

const Chat: React.FC = () => {
  const variants = {
    initial: {
      y: -1000,
    },
    animate: { y: 0 },
  }

  const { showContacts } = useShowContacts()

  return (
    <StyledChat
      className={showContacts ? "" : "showChat"}
      variants={variants}
      initial="initial"
      animate="animate"
    >
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

  @media only screen and (max-width: 500px) {
    display: none;

    width: 100%;
    height: 100%;

    --InputHeight: calc(var(--conversationsWidth) / 6);
  }
`

export default Chat
