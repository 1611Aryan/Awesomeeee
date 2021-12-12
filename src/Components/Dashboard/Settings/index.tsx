import styled from "@emotion/styled"
import SideBar from "./SideBar"
import Content from "./Content"

const Settings = () => {
  return (
    <StyledSettings>
      <SideBar />
      <Content />
    </StyledSettings>
  )
}

const StyledSettings = styled.section`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  z-index: 9;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  --LeftPanelWidth: 30vw;
  --RightPanelWidth: calc(100vw - var(--LeftPanelWidth));
`

export default Settings
