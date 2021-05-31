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

  overflow: hidden;

  --HeaderHeight: calc(
    var(--topPadding) + var(--headingSize) + var(--searchBarMarginT)
  );
  --HeaderPadding: 1em;
  --HeaderFontSize: calc(var(--chatWidth) * 0.0259);
  --HeaderFontSize: calc(var(--HeaderHeight) / 3);

  --ImageHeight: calc(var(--HeaderHeight) - 1.5 * var(--HeaderPadding));

  --InputHeight: 10vh;
  --InputFontSize: calc(var(--HeaderFontSize) * 0.5);

  --MessagesHeight: calc(100vh - var(--HeaderHeight) - var(--InputHeight));
  --MessagesFontSize: calc(var(--conversationsWidth) * 0.039);
`;

export default Chat;
