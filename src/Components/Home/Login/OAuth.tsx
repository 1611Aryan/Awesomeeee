import google from "./../../../Media/PNG/google_icon_2048 (1).png"
import facebook from "./../../../Media/PNG/facebook.png"
import { baseUrl, googleAuth } from "../../../API_Endpoints"
import { useAccess } from "../../../Providers/AccessProvider"
import styled from "styled-components"

type payload = {
  success: boolean
  username: string
}

const OAuth: React.FC = () => {
  const { setAccess } = useAccess()

  const googleAuthHandler = async () => {
    let width = 500
    let height = 750

    let params = `location=1,status=1,scrollbars=1,resizable=no,toolbar=no,menubar=no,
    width=${width},height=${height},left=${
      (window.innerWidth - width) / 2
    },top=${(window.innerHeight - height) / 2}`

    window.open(googleAuth.URL, "login", params)

    window.addEventListener("message", (message: MessageEvent<payload>) => {
      if (message.origin === baseUrl) {
        console.log(message.data)
        if (message.data.success)
          setAccess({ loggedIn: true, username: message.data.username })
      }
    })
  }

  return (
    <StyledOAuth>
      <div className="or">
        <div className="line"></div>
        <h3>Or, login with</h3>
        <div className="line"></div>
      </div>

      <div className="providers">
        <div className="logo google" onClick={googleAuthHandler}>
          <img src={google} alt="google" />
          <span>Google</span>
        </div>

        <div className="logo facebook">
          <img src={facebook} alt="facebook" />
          <span>Facebook</span>
        </div>
      </div>
    </StyledOAuth>
  )
}

const StyledOAuth = styled.div`
  width: 100%;
  margin: clamp(0.5em, 3vw, 1em) 0;
  .or {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    .line {
      width: 100%;
      height: 1px;
      background: #bebebe;
      flex: 1;
    }
    h3 {
      font-size: clamp(0.8em, 3vw, 1em);
      color: #8b8b8b;
      font-weight: 700;
    }
  }
  .providers {
    margin-top: clamp(0.75em, 3vw, 1.5em);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    border-radius: 15px;
    box-shadow: 0 0 2px #0008;

    padding: clamp(0.8em, 2vw, 0.8em) 2em;
    font-size: clamp(0.8em, 3vw, 1em);

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    cursor: pointer;
    img {
      width: 22px;
      height: 22px;
    }
    span {
      width: 9ch;
      font-family: var(--fontGoogle);
      margin-left: 1em;
      color: #000;
    }

    &:hover,
    &:focus {
      box-shadow: none;
      background: #f8f8f8;
    }
  }

  @media only screen and (max-width: 600px) {
    .providers {
      height: 2em;
      gap: 1em;
    }
  }
`

export default OAuth
