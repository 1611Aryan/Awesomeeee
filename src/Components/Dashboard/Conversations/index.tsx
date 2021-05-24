import { useState } from "react";
import styled from "styled-components";
import Contacts from "./Contacts";
import SearchBar from "./SearchBar";

const Conversations: React.FC<{
  setSelected: React.Dispatch<
    React.SetStateAction<{
      name: string;
      img: string;
    }>
  >;
}> = ({ setSelected }) => {
  const [displacement, setDisplacement] = useState<number>();

  return (
    <StyledConversations>
      <div className="border"></div>
      <h1>Conversations</h1>

      <SearchBar setDisplacement={setDisplacement} />

      <Contacts displacement={displacement} setSelected={setSelected} />
    </StyledConversations>
  );
};

const StyledConversations = styled.div`
  width: var(--conversationsWidth);
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
    width: 1px;
    height: 98%;
    background: linear-gradient(to right, #fff, transparent);

    cursor: w-resize;
  }

  h1 {
    color: white;
    font-family: var(--fontHeading);
    font-weight: 500;
    font-size: var(--headingSize);
    line-height: var(--headingSize);
  }
`;

export default Conversations;
