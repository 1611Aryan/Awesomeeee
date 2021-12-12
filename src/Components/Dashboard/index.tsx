import { useEffect, lazy, Suspense } from "react"
import styled from "@emotion/styled"
import io from "socket.io-client"
import axios from "axios"

import { useAccess } from "Providers/AccessProvider"

import { useSocket } from "Providers/SocketProvider"

import {
  getProfile,
  logoutEndpoint,
  WEBSOCKET_ENDPOINT,
} from "../../API_Endpoints"
import Petal from "../Loaders/Petal/Petal"

import Overlay from "../Loaders/Overlay/Overlay"

import { AnimatePresence } from "framer-motion"
import { Outlet } from "react-router-dom"
import useTypedSelector from "Hooks/useTypedSelector"
import useTypedDispatch from "Hooks/useTypedDispatch"
import {
  addContacts,
  addMessage,
  changeContactStatus,
  contactI,
  messageI,
} from "Redux/Slices/Contact.Slice"
import { addUser, userI } from "Redux/Slices/User.Slice"

const GettingStarted = lazy(() => import("./GettingStarted"))

const Dashboard: React.FC = () => {
  const { socket, setSocket } = useSocket()

  const { setAccess } = useAccess()

  const { user } = useTypedSelector(state => state.user)

  const dispatch = useTypedDispatch()

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
          contacts: contactI[]
        }>(getProfile.URL, {
          withCredentials: true,
        })
        dispatch(addUser(res.data.user))
        dispatch(addContacts(res.data.contacts))

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
        dispatch(changeContactStatus({ contactId, status }))
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  //*Recieve Message
  useEffect(() => {
    socket &&
      socket.on(
        "recieveMessage",
        ({ roomId, sender, message }: messageI & { roomId: string }) => {
          dispatch(addMessage({ message, sender, roomId }))
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
          <Outlet />
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
  --headingSize: 2em;
  --sideBarHeading: calc(var(--sideBarWidth) * 0.8);
  --searchBarMarginT: calc(var(--conversationsWidth) * 0.1);

  @media only screen and (max-width: 500px) {
    --sideBarWidth: 10vw;
    --chatWidth: calc(100vw - var(--sideBarWidth));
    // --chatWidth: 0;
    --conversationsWidth: 90vw;
  }
`

export default Dashboard
