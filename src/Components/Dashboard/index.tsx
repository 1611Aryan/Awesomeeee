import { useState, useEffect, lazy, Suspense } from "react"
import styled from "styled-components"
import io from "socket.io-client"
import axios from "axios"

import SideBar from "./SideBar"
import Conversations from "./Conversations"
import Chat from "./Chat"
import ClosedChat from "./ClosedChat"

import { useAccess } from "../../Providers/AccessProvider"
import { useUser, userI } from "../../Providers/UserProvider"
import { useSelectedContact } from "../../Providers/SelectedContactProvider"
import { useSocket } from "../../Providers/SocketProvider"

const Settings = lazy(() => import("./Settings"))

const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "wss://awesomeeeee.herokuapp.com"
    : "ws://localhost:5000"

const Dashboard: React.FC = () => {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://awesomeeeee.herokuapp.com/user/profile"
      : "http://localhost:5000/user/profile"

  const [settingsActive, setSettingsActive] = useState(false)

  const { socket, setSocket } = useSocket()
  const { selected } = useSelectedContact()
  const { setAccess } = useAccess()
  const { setUser, rooms, addMessageToRoom } = useUser()

  const logout = () => {
    setAccess({ loggedIn: false, username: null })

    //!logout from server also
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get<{ user: userI }>(url, {
          withCredentials: true,
        })
        setUser(res.data.user)
      } catch (err) {
        logout()
        console.log(err)
      }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setSocket(() =>
      io(ENDPOINT, {
        transports: ["websocket"],
      })
    )

    return () => {
      socket && socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    socket && rooms && socket.emit("joinAll", rooms)
  }, [rooms, socket])

  useEffect(() => {
    socket && socket.on("recieveMessage", addMessageToRoom)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  useEffect(() => {
    socket && socket.onAny(console.log)
  }, [socket])

  return (
    <StyledDashboard>
      <SideBar setSettingsActive={setSettingsActive} />
      <Conversations />
      {selected ? <Chat /> : <ClosedChat />}
      <Suspense fallback={<div>Loading...</div>}>
        {settingsActive && <Settings setSettingsActive={setSettingsActive} />}
      </Suspense>
    </StyledDashboard>
  )
}

const StyledDashboard = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  background: linear-gradient(to top, #2b5876, #4e4376);

  --conversationsWidth: var(--size);
  --sideBarWidth: calc(var(--conversationsWidth) / 5.5);
  --chatWidth: calc(100vw - var(--sideBarWidth) - var(--conversationsWidth));

  --headerHeight: 10vh;

  --topPadding: calc(var(--conversationsWidth) * 0.1);
  --headingSize: calc(var(--conversationsWidth) * 0.087);
  --sideBarHeading: calc(var(--sideBarWidth) * 0.8);
  --searchBarMarginT: calc(var(--conversationsWidth) * 0.1);
`

export default Dashboard
