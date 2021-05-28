import styled from "styled-components";
import Header from "./Header";
import Input from "./Input";
import Messages from "./Messages";

const Chat: React.FC<{
  selected: {
    name: string;
    img: string;
  } | null;
}> = ({ selected }) => {
  return (
    <StyledChat>
      <Header selected={selected} />
      <Messages />
      <Input />
    </StyledChat>
  );
};

const StyledChat = styled.main`
  width: var(--chatWidth);
  height: 100vh;
  background: transparent;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  --HeaderHeight: calc(
    var(--topPadding) + var(--headingSize) + var(--searchBarMarginT)
  );
  --HeaderPadding: 1em;
  --ImageHeight: calc(var(--HeaderHeight) - 1.5 * var(--HeaderPadding));
  --InputHeight: 10vh;
  --MessagesHeight: calc(100vh - var(--HeaderHeight) - var(--InputHeight));
`;

export default Chat;
