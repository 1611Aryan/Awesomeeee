import styled from "styled-components"
import AddContact from "./AddContact"

import Profile from "./Profile"

const SideBar: React.FC<{
  setSettingsActive: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setSettingsActive }) => {
  return (
    <StyledSideBar>
      <h1>M</h1>
      <AddContact />
      <Profile setSettingsActive={setSettingsActive} />
    </StyledSideBar>
  )
}

const StyledSideBar = styled.div`
  width: clamp(3vw, var(--sideBarWidth), 10vw);

  height: 100vh;
  padding: 1rem 0.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  background: rgb(16, 16, 16, 0.5);
  h1 {
    font-family: var(--fontHeading);
    font-size: var(--sideBarHeading);

    color: white;
  }
`

export default SideBar
