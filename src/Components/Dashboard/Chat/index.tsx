import styled from "styled-components";
import Header from "./Header";
import Input from "./Input";

const Chat: React.FC<{
  selected: {
    name: string;
    img: string;
  };
}> = ({ selected }) => {
  return (
    <StyledChat>
      <Header selected={selected} />
      <Input />
    </StyledChat>
  );
};

const StyledChat = styled.main`
  width: var(--chatWidth);
  height: 100%;
  background: transparent;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

export default Chat;
