import { IoMdSettings } from "react-icons/io"
import { FiLogOut } from "react-icons/fi"
import styled from "@emotion/styled"

import { Link } from "react-router-dom"

import useLogout from "Hooks/useLogout"

const Options: React.FC = () => {
  const logout = useLogout()

  return (
    <StyledOptions className="options">
      <Link to="/dashboard/settings">
        <IoMdSettings />
      </Link>
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
    font-size: clamp(1.2em, 3vw, 1.5em);
    cursor: pointer;

    transform: scaleY(0.5);
  }
`

export default Options
