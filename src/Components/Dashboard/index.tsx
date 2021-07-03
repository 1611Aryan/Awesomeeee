import { useState, useEffect, lazy, Suspense } from "react"
import styled from "styled-components"
import io from "socket.io-client"
import axios from "axios"

import SideBar from "./SideBar"
import Conversations from "./Conversations"
import Chat from "./Chat"
import ClosedChat from "./ClosedChat"

import { useAccess } from "../../Providers/AccessProvider"

import { useSelectedContact } from "../../Providers/SelectedContactProvider"
import { useSocket } from "../../Providers/SocketProvider"
import { actionsUser, userI } from "../../Actions/userActions"
import { useDispatch } from "react-redux"
import {
  actionsContacts,
  contactI,
  messageI,
} from "../../Actions/contactsAction"

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

  const dispatch = useDispatch()

  const [rooms, setRooms] = useState<string[] | null>(null)

  const logout = () => {
    setAccess({ loggedIn: false, username: null })

    //!logout from server also
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios.get<{
          user: userI
          contacts: contactI[] | null
        }>(url, {
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

        const tempRooms = res.data.contacts
          ? res.data.contacts.map(contact => contact.roomId)
          : null

        setRooms(tempRooms)

        setSocket(() =>
          io(ENDPOINT, {
            transports: ["websocket"],
            query: {
              id: res.data.user._id,
              rooms: JSON.stringify(tempRooms),
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

  //*Join All
  useEffect(() => {
    socket && rooms && socket.emit("joinAll", rooms)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  //*Online
  useEffect(() => {
    socket &&
      socket.on("online", ({ contactId, status }) => {
        console.log(contactId, status)

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
