import Overlay from "Components/Loaders/Overlay/Overlay"
import { useSelectedContact } from "Providers/SelectedContactProvider"
import { lazy, Suspense, useState } from "react"

import ClosedChat from "./ClosedChat"
import Conversations from "./ContactList"
import SideBar from "./SideBar"

const Chat = lazy(() => import("./Chat"))

const DashboardHome = () => {
  const { selected } = useSelectedContact()

  const [showConversations, setShowConversations] = useState(true)

  return (
    <>
      <SideBar setShowConversations={setShowConversations} />
      {showConversations ? (
        <Conversations setShowConversations={setShowConversations} />
      ) : (
        <Suspense fallback={<Overlay />}>
          {selected ? <Chat /> : <ClosedChat />}
        </Suspense>
      )}
    </>
  )
}

export default DashboardHome
