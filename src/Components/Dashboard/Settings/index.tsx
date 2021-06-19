import styled from "styled-components"
import Menu from "./Menu"
import Options from "./Options"

const Settings: React.FC<{
  setSettingsActive: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setSettingsActive }) => {
  return (
    <StyledSettings>
      <Menu setSettingsActive={setSettingsActive} />
      <Options />
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
`

export default Settings
