import { useState, useEffect, lazy, Suspense } from "react"
import styled from "styled-components"
import io from "socket.io-client"
import axios from "axios"

import SideBar from "./SideBar"
import Conversations from "./ContactList"
import ClosedChat from "./ClosedChat"

import { useAccess } from "Providers/AccessProvider"
import { useSelectedContact } from "Providers/SelectedContactProvider"
import { useSocket } from "Providers/SocketProvider"
import { actionsUser, userI } from "Actions/userActions"
import { useDispatch, useSelector } from "react-redux"
import {
  actionsContacts,
  contactI,
  messageI,
} from "../../Actions/contactsAction"
import {
  getProfile,
  logoutEndpoint,
  WEBSOCKET_ENDPOINT,
} from "../../API_Endpoints"
import Petal from "../Loaders/Petal/Petal"
import { rootState } from "../../Reducers"
import Overlay from "../Loaders/Overlay/Overlay"

import { AnimatePresence } from "framer-motion"

const Settings = lazy(() => import("./Settings"))
const Chat = lazy(() => import("./Chat"))
const GettingStarted = lazy(() => import("./GettingStarted"))

const Dashboard: React.FC = () => {
  const [settingsActive, setSettingsActive] = useState(false)

  const { socket, setSocket } = useSocket()
  const { selected } = useSelectedContact()
  const { setAccess } = useAccess()

  const { user } = useSelector((state: rootState) => state)

  const dispatch = useDispatch()

  const logout = async () => {
    setAccess({ loggedIn: false, username: null })
    socket && socket.disconnect()
    await axios[logoutEndpoint.METHOD](logoutEndpoint.URL, {
      withCredentials: true,
    })
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios[getProfile.METHOD]<{
          user: userI
          contacts: contactI[] | null
        }>(getProfile.URL, {
          withCredentials: true,
        })
        dispatch({
          type: actionsUser.ADD_USER,
          payload: { user: res.data.user },
        })
        dispatch({
          type: actionsContacts.SET_CONTACTS,
          payload: {
            contacts: res.data.contacts
              ? res.data.contacts.map(contact => {
                  return {
                    ...contact,
                    messages: null,
                  }
                })
              : null,
          },
        })

        const rooms = res.data.contacts
          ? res.data.contacts.map(contact => contact.roomId)
          : null

        setSocket(() =>
          io(WEBSOCKET_ENDPOINT, {
            transports: ["websocket"],
            query: {
              id: res.data.user._id,
              rooms: JSON.stringify(rooms),
            },
          })
        )
      } catch (err) {
        logout()
        console.log(err)
      }
    })()

    return () => {
      console.log("disconnect")
      socket && socket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //*Online
  useEffect(() => {
    socket &&
      socket.on("online", ({ contactId, status }) => {
        dispatch({
          type: actionsContacts.CHANGE_CONTACT_STATUS,
          payload: { contactStatus: { contactId, status } },
        })
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  //*Recieve Message
  useEffect(() => {
    socket &&
      socket.on(
        "recieveMessage",
        ({ room, sender, message }: messageI & { room: string }) => {
          dispatch({
            type: actionsContacts.ADD_MESSAGE,
            payload: {
              message: { roomId: room, sender, message },
            },
          })
        }
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  //*Dev logs all events
  useEffect(() => {
    socket && socket.onAny(console.log)
  }, [socket])

  return (
    <Suspense fallback={<Petal />}>
      {user && (
        <StyledDashboard>
          <Suspense fallback={<Overlay />}>
            <AnimatePresence>
              {!user.profileSetup && <GettingStarted />}
            </AnimatePresence>
          </Suspense>
          {settingsActive ? (
            <Settings setSettingsActive={setSettingsActive} />
          ) : (
            <>
              <SideBar setSettingsActive={setSettingsActive} />
              <Conversations />
              <Suspense fallback={<Overlay />}>
                {selected ? <Chat /> : <ClosedChat />}
              </Suspense>
            </>
          )}
        </StyledDashboard>
      )}
    </Suspense>
  )
}

const StyledDashboard = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  background: linear-gradient(to top, rgb(43, 88, 118), #4e4376);

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
