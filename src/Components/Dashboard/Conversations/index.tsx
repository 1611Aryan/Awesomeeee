import { useState } from "react";
import styled from "styled-components";
import Contacts from "./Contacts";
import SearchBar from "./SearchBar";

const Conversations: React.FC = () => {
  const [displacement, setDisplacement] = useState<number>();

  return (
    <StyledConversations>
      <h1>Conversations</h1>

      <SearchBar setDisplacement={setDisplacement} />

      <Contacts displacement={displacement} />
    </StyledConversations>
  );
};

const StyledConversations = styled.div`
  width: 25vw;
  height: 100vh;
  padding: 2rem 1rem 0;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  border-right: 0.5px solid #fff;
  h1 {
    color: white;
    font-family: var(--fontHeading);
    font-weight: 500;
    font-size: 2rem;
  }
`;

export default Conversations;
