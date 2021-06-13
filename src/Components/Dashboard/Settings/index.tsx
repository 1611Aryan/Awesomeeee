import styled from "styled-components"
import LeftPanel from "./LeftPanel"
import RightPanel from "./RightPanel"

const Settings: React.FC<{
  setSettingsActive: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setSettingsActive }) => {
  return (
    <StyledSettings>
      <LeftPanel setSettingsActive={setSettingsActive} />
      <RightPanel />
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

  --LeftPanelWidth: 20vw;
  --RightPanelWidth: calc(100vw - var(--LeftPanelWidth));
`

export default Settings
