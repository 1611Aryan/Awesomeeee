import styled from "@emotion/styled"
import Overlay from "Components/Loaders/Overlay/Overlay"
import { useSelectedContact } from "Providers/SelectedContactProvider"
import { lazy, Suspense } from "react"

import ClosedChat from "./ClosedChat"
import ContactList from "./ContactList"
import SideBar from "./SideBar"

const Chat = lazy(() => import("./Chat"))

const DashboardHome = () => {
  const { selected } = useSelectedContact()

  return (
    <StyledHome>
      <SideBar />
      <ContactList />
      <Suspense fallback={<Overlay />}>
        {selected ? <Chat /> : <ClosedChat />}
      </Suspense>
    </StyledHome>
  )
}

const StyledHome = styled.main`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @media only screen and (max-width: 500px) {
    .hideContacts {
      display: none;
    }

    .showChat {
      display: block;
    }
  }
`

export default DashboardHome
