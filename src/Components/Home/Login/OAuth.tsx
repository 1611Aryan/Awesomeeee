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
        <h3>OR</h3>
        <div className="line"></div>
      </div>

      <div className="providers">
        <div className="logo google" onClick={googleAuthHandler}>
          <div className="imgContainer">
            <img src={google} alt="google" />
          </div>
          <span>Sign in with Google</span>
        </div>

        <div className="logo facebook">
          <div className="imgContainer">
            <img src={facebook} alt="facebook" />
          </div>
          <span>Sign in with Facebook</span>
        </div>
      </div>
    </StyledOAuth>
  )
}

const StyledOAuth = styled.div`
  width: 100%;
  margin: clamp(0.5em, 3vw, 1em) 0 clamp(0.75em, 3vw, 1.5em);
  .or {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    .line {
      width: 100%;
      height: 1px;
      background: #8b8b8b;
      flex: 1;
    }
    h3 {
      font-size: clamp(0.9em, 4vw, 1.25em);
      color: #8b8b8b;
    }
  }
  .providers {
    margin-top: clamp(0.75em, 3vw, 1.5em);
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.5em;
  }

  .logo {
    background: #4285f4;

    border-radius: 2px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    cursor: pointer;

    .imgContainer {
      width: calc(2.5em - 2px);
      height: 100%;

      background: #fff;
      display: grid;
      place-items: center;

      border-radius: 1px;

      img {
        width: 50%;
        object-fit: cover;
      }
    }
    span {
      font-family: var(--fontGoogle);
      padding: 0 2rem 0 0.5rem;
      font-size: clamp(0.6em, 3vw, 1em);
      color: #fff;
    }
  }

  .google {
    .imgContainer {
      border: 1px solid #4285f4;
    }
  }
  .facebook {
    background: #4267b2;

    .imgContainer {
      background: none;
      margin: 0;
      height: 100%;
      img {
        width: 22px;
        height: 22px;
      }
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
