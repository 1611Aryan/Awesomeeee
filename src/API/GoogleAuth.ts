import { baseUrl, googleLoginAuth, googleSignupAuth } from "API_Endpoints"
import { loginUser } from "Redux/Slices/Access.Slice"

type payload = {
  success: boolean
  username?: string
  message?: string
}

const GoogleAuth = (type: "login" | "signup") => {
  const url = type === "login" ? googleLoginAuth : googleSignupAuth

  let width = 500
  let height = 750

  let params = `location=1,status=1,scrollbars=1,resizable=no,toolbar=no,menubar=no,
    width=${width},height=${height},left=${
    (window.innerWidth - width) / 2
  },top=${(window.innerHeight - height) / 2}`

  window.open(url.URL, type, params)

  window.addEventListener("message", (message: MessageEvent<payload>) => {
    if (message.origin === baseUrl) {
      //   if (message.data.success && message.data.username)
      //     dispatch(loginUser({ username: message.data.username }))
      //   else setError({ type: "oauth", info: message.data.message || "" })
      return message.data
    }
  })
}

export const EventHandler =
  (dispatch: any, setError: any) => (message: MessageEvent<payload>) => {
    if (message.origin === baseUrl) {
      if (message.data.success && message.data.username)
        dispatch(loginUser({ username: message.data.username }))
      else setError({ type: "oauth", info: message.data.message || "" })
    }
  }

export default GoogleAuth
