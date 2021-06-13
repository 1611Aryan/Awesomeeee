import styled from "styled-components"
import Profile from "./Profile"

const RightPanel: React.FC = () => {
  return (
    <StyledRightPanel>
      <Profile />
    </StyledRightPanel>
  )
}

const StyledRightPanel = styled.section`
  width: var(--RightPanelWidth);
  height: 100vh;
`

export default RightPanel
