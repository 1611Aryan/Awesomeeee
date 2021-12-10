import styled from "styled-components"

import Profile from "./Profile"
import SubMenu from "./SubMenu"

const SideBar: React.FC<{
  setShowConversations: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setShowConversations }) => {
  return (
    <StyledSideBar>
      <h1>M</h1>
      <SubMenu setShowConversations={setShowConversations} />
      <Profile />
    </StyledSideBar>
  )
}

const StyledSideBar = styled.div`
  width: var(--sideBarWidth);

  height: 100vh;
  padding: 1em clamp(0.35em, 1vw, 0.5em);

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  background: rgb(16, 16, 16, 0.5);
  h1 {
    font-family: var(--fontHeading);
    font-size: clamp(1.5em, 3vw, 3em);

    color: white;
  }
`

export default SideBar
