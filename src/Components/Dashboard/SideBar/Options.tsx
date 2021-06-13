import { IoMdSettings } from "react-icons/io"
import { FiLogOut } from "react-icons/fi"
import styled from "styled-components"
import { useAccess } from "../../../Providers/AccessProvider"

const Options: React.FC<{
  setSettingsActive: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setSettingsActive }) => {
  const { setAccess } = useAccess()

  const openSettings = () => {
    setSettingsActive(true)
  }

  const logout = () => {
    setAccess({ loggedIn: false, username: null })
  }

  return (
    <StyledOptions className="options">
      <IoMdSettings onClick={openSettings} />
      <FiLogOut onClick={logout} />
    </StyledOptions>
  )
}

const StyledOptions = styled.div`
  width: 100%;
  flex: 1;

  transform: translateY(100%) scaleY(2);
  opacity: 0;
  pointer-events: none;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  transition: transform ease-in-out 0.2s;
  svg {
    color: #000000;
    font-size: 1.5em;
    cursor: pointer;

    transform: scaleY(0.5);
  }
`

export default Options
