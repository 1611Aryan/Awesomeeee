import { useWidth } from "Providers/WidthProvider"
import styled from "styled-components"
import AddContact from "./AddContact"
import OpenContact from "./OpenContacts"

const SubMenu: React.FC<{
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowConversations }) => {
  const { width } = useWidth()

  return (
    <StyledSubMenu>
      {!(width > 500) && (
        <OpenContact setShowConversations={setShowConversations} />
      )}
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
