import { useState, lazy, Suspense } from "react"
import styled from "styled-components"

import SideBar from "./SideBar"
import Conversations from "./Conversations"
import Chat from "./Chat"
import ClosedChat from "./ClosedChat"
import { useEffect } from "react"
import axios from "axios"
import { useAccess } from "../../Providers/AccessProvider"
import { useUser } from "../../Providers/UserProvider"

const Settings = lazy(() => import("./Settings"))

interface user {
  id: string
  username: string
  profilePicture: {
    large: string
    thumbnail: string
  }
  contacts: {
    name: user["username"]
    id: user["id"]
    profilePicture: user["profilePicture"]
  }[]
}

const Dashboard: React.FC = () => {
  const url = "http://localhost:5000/user/profile"

  const [selected, setSelected] =
    useState<{ name: string; img: string } | null>(null)
  const [settingsActive, setSettingsActive] = useState(false)

  const { setAccess } = useAccess()
  const { setUser } = useUser()

  const logout = () => {
    setAccess({ loggedIn: false, username: null })
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get<{ user: user }>(url, {
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

  return (
    <StyledDashboard>
      <SideBar setSettingsActive={setSettingsActive} />
      <Conversations selected={selected} setSelected={setSelected} />
      {selected ? <Chat selected={selected} /> : <ClosedChat />}
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
