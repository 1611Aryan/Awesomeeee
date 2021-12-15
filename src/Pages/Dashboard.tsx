import { useEffect, lazy, Suspense } from "react"
import styled from "@emotion/styled"

import { useSocket } from "Providers/SocketProvider"

import Petal from "Components/Loaders/Petal/Petal"

import Overlay from "Components/Loaders/Overlay/Overlay"

import { AnimatePresence } from "framer-motion"
import { Outlet } from "react-router-dom"
import useTypedSelector from "Hooks/useTypedSelector"
import useTypedDispatch from "Hooks/useTypedDispatch"
import {
  addContacts,
  addMessage,
  changeContactStatus,
  messageI,
} from "Redux/Slices/Contact.Slice"
import { addUser } from "Redux/Slices/User.Slice"

import { batch } from "react-redux"
import { GetProfile } from "API/GetProfile"
import useLogout from "Hooks/useLogout"

const GettingStarted = lazy(() => import("Components/Dashboard/GettingStarted"))

const Dashboard: React.FC = () => {
  const { socket, connectSocket } = useSocket()

  const { user } = useTypedSelector(state => state.user)

  const dispatch = useTypedDispatch()

  const logout = useLogout()

  useEffect(() => {
    ;(async () => {
      try {
        const [user, contacts, rooms] = await GetProfile()
        batch(() => {
          dispatch(addUser(user))
          dispatch(addContacts(contacts))
        })

        connectSocket({ id: user._id, rooms: JSON.stringify(rooms) })
      } catch (err) {
        logout()
        console.log(err)
      }
    })()

    return () => {
      socket?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //*Online
  useEffect(() => {
    socket?.on("online", ({ contactId, status }) =>
      dispatch(changeContactStatus({ contactId, status }))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  //*Recieve Message
  useEffect(() => {
    socket?.on(
      "recieveMessage",
      ({ roomId, sender, message }: messageI & { roomId: string }) => {
        console.log({ roomId, sender, message })
        dispatch(addMessage({ message, sender, roomId }))
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
