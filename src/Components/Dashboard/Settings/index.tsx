import styled from "styled-components"
import SideBar from "./SideBar"
import Content from "./Content"

const Settings: React.FC<{
  setSettingsActive: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setSettingsActive }) => {
  return (
    <StyledSettings>
      <SideBar setSettingsActive={setSettingsActive} />
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

  background: linear-gradient(to top, #2b5876, #4e4376);

  --LeftPanelWidth: 30vw;
  --RightPanelWidth: calc(100vw - var(--LeftPanelWidth));

  --labelFontSize: 1.1em;
  --labelFontWeight: 400;
  --labelColor: #b8b8b8;

  --inputFontSize: 1em;
  --inputFontWeight: 300;
  --inputColor: rgba(255, 255, 255, 0.8);
  --inputMargin: 0.5em 0;
`

export default Settings
