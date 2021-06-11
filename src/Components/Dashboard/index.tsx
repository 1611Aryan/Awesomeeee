import { useLayoutEffect, useRef, useState } from "react"
import styled from "styled-components"

import SideBar from "./SideBar"
import Conversations from "./Conversations"
import Chat from "./Chat"
import ClosedChat from "./ClosedChat"
import useLocalStorage from "../../Hooks/useLocalStorage"

const Dashboard: React.FC = () => {
  const [selected, setSelected] =
    useState<{ name: string; img: string } | null>(null)
  const [savedPosition, setSavedPosition] = useLocalStorage<number>("width", 0)

  const [displacement, setDisplacement] = useState(() => {
    if (typeof savedPosition === "number") return savedPosition
    else return 0
  })

  const width = window.innerWidth * 0.25

  const dashboardRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (dashboardRef.current)
      if (
        displacement <= window.innerWidth * 0.23 &&
        displacement >= window.innerWidth * -0.07
      )
        dashboardRef.current.style.setProperty(
          "--conversationsWidth",
          `${(width + displacement) * 0.85}px`
        )
  }, [displacement, width])

  return (
    <StyledDashboard ref={dashboardRef}>
      <SideBar />
      <Conversations
        setSavedPosition={setSavedPosition}
        displacement={displacement}
        setDisplacement={setDisplacement}
        selected={selected}
        setSelected={setSelected}
      />
      {selected ? <Chat selected={selected} /> : <ClosedChat />}
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

  //--conversationsWidth: ${props => props.theme.displacement}px;
  --sideBarWidth: calc(var(--conversationsWidth) * 0.17);

  --chatWidth: calc(100vw - var(--sideBarWidth) - var(--conversationsWidth));

  --topPadding: calc(var(--conversationsWidth) * 0.1);
  --headingSize: calc(var(--conversationsWidth) * 0.087);
  --sideBarHeading: calc(var(--sideBarWidth) * 0.8);
  --searchBarMarginT: calc(var(--conversationsWidth) * 0.1);
`

export default Dashboard
