import { logoutEndpoint } from "API_Endpoints"
import axios from "axios"
import { useSocket } from "Providers/SocketProvider"
import { logoutUser } from "Redux/Slices/Access.Slice"
import useTypedDispatch from "./useTypedDispatch"

const useLogout = () => {
  const dispatch = useTypedDispatch()
  const { socket } = useSocket()

  const logout = () => {
    dispatch(logoutUser())
    socket?.disconnect()
    axios[logoutEndpoint.METHOD](logoutEndpoint.URL, {
      withCredentials: true,
    })
  }

  return logout
}

export default useLogout
