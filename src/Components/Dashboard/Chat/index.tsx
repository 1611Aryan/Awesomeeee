import { motion } from "framer-motion"
import { useState } from "react"
import styled from "styled-components"
import Header from "./Header"
import Input from "./Input"
import Messages from "./Messages"

const Chat: React.FC<{
  selected: {
    name: string
    img: string
  } | null
}> = ({ selected }) => {
  const [messages, setMessages] = useState<
    {
      message: string
      sender: "me" | "contact"
    }[]
  >([
    {
      message:
        "Aliquam sit amet purus faucibus, lobortis neque nec, cursus nulla. Integer dignissim diam quis erat commodo semper. Nulla congue aliquet nisi sed iaculis. Fusce ullamcorper magna sit amet commodo pharetra. Ut sem massa, dictum in augue vitae, fringilla imperdiet felis. Interdum et malesuada fames ac.. ",
      sender: "contact",
    },
    {
      message:
        "Cras vitae vehicula elit. Phasellus rutrum ultrices diam in porta. In rutrum mollis nisi. Maecenas sodales arcu vulputate condimentum interdum. Praesent mollis posuere aliquam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus lectus dolor, posuere ac purus quis, vehicula.",
      sender: "me",
    },
    {
      message:
        "Duis commodo ipsum mi, nec interdum quam placerat id. Nullam luctus cursus nunc at lacinia. Vivamus diam erat, lacinia vel enim eu, bibendum ullamcorper libero. Quisque faucibus non augue at auctor. Duis id mi quis lacus pharetra posuere luctus et libero. Morbi id urna non.",
      sender: "contact",
    },
    {
      message:
        "Donec in massa et quam volutpat tempor. Vivamus vel ligula lacinia, pellentesque erat nec, fringilla sem. Etiam et dolor et nunc blandit pellentesque.",
      sender: "me",
    },
    {
      message: "posuere aliquam. Pellentesque habitant morbi tri",
      sender: "contact",
    },
  ])

  const variants = {
    initial: {
      y: -1000,
    },
    animate: { y: 0 },
  }

  return (
    <StyledChat variants={variants} initial="initial" animate="animate">
      <Header selected={selected} />
      <Messages messages={messages} />
      <Input setMessages={setMessages} />
    </StyledChat>
  )
}

const StyledChat = styled(motion.main)`
  width: var(--chatWidth);
  height: 100vh;
  background: rgba(16, 16, 16, 0.25);

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  overflow: hidden;

  --HeaderHeight: calc(
    var(--topPadding) + var(--headingSize) + var(--searchBarMarginT)
  );
  --HeaderPadding: 1em;
  --HeaderFontSize: calc(var(--chatWidth) * 0.0259);
  --HeaderFontSize: calc(var(--HeaderHeight) / 3);

  --ImageHeight: calc(var(--HeaderHeight) - 1.85 * var(--HeaderPadding));

  --InputHeight: 10vh;
  --InputFontSize: calc(var(--HeaderFontSize) * 0.5);

  --MessagesHeight: calc(100vh - var(--HeaderHeight) - var(--InputHeight));
  --MessagesFontSize: calc(var(--conversationsWidth) * 0.044);
`

export default Chat
