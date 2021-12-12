import { IoMdSettings } from "react-icons/io"
import { FiLogOut } from "react-icons/fi"
import styled from "@emotion/styled"
import { useAccess } from "Providers/AccessProvider"
import axios from "axios"
import { logoutEndpoint } from "API_Endpoints"
import { useSocket } from "Providers/SocketProvider"
import { Link } from "react-router-dom"

const Options: React.FC = () => {
  const { setAccess } = useAccess()
  const { socket } = useSocket()

  const logout = async () => {
    setAccess({ loggedIn: false, username: null })
    socket && socket.disconnect()
    await axios[logoutEndpoint.METHOD](logoutEndpoint.URL, {
      withCredentials: true,
    })
  }

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
