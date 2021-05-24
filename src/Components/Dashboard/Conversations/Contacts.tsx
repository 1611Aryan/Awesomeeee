import styled from "styled-components";
import Contact from "./Contact";

const Contacts: React.FC<{ displacement: number | undefined }> = ({
  displacement,
}) => {
  return (
    <StyledContacts theme={{ displacement }}>
      <ul>
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
        <Contact />
      </ul>
    </StyledContacts>
  );
};

const StyledContacts = styled.div`
  width: 100%;
  height: ${props => window.innerHeight - props.theme.displacement}px;
  flex: 1;
  ul {
    width: 100%;
    max-height: 100%;
    overflow-y: auto;

    list-style-type: none;

    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default Contacts;
