import styled from "@emotion/styled"
import AddContact from "./AddContact"
import OpenContact from "./OpenContacts"

const SubMenu: React.FC = () => {
  return (
    <StyledSubMenu>
      <OpenContact />
      <AddContact />
    </StyledSubMenu>
  )
}

const StyledSubMenu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  svg {
    cursor: pointer;
    color: white;
    font-size: clamp(1.1em, 2vw, 1.3em);
  }

  > * + * {
    margin-top: 1.5em;
  }
`

export default SubMenu
