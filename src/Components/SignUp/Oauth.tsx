import google from "Media/PNG/google.png"

import styled from "@emotion/styled"
import GoogleAuth from "API/GoogleAuth"
import { error } from "API/SignupApi"
import useTypedDispatch from "Hooks/useTypedDispatch"
import { useEffect } from "react"
import { EventHandler } from "../../API/GoogleAuth"

const OAuth: React.FC<{
  setError: React.Dispatch<React.SetStateAction<error>>
}> = ({ setError }) => {
  const dispatch = useTypedDispatch()

  const googleAuthHandler = () => {
    GoogleAuth("signup")
    window.addEventListener("message", EventHandler(dispatch, setError))
  }

  useEffect(() => window.removeEventListener("message", () => {}), [])

  return (
    <StyledOAuth>
      <div className="or">
        <div className="line"></div>
        <h3>Or, Signup with</h3>
        <div className="line"></div>
      </div>

      <div className="providers">
        <div className="logo google" onClick={googleAuthHandler}>
          <img src={google} alt="google" />
          <span>Google</span>
        </div>
      </div>
    </StyledOAuth>
  )
}

const StyledOAuth = styled.div`
  width: 50%;
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

    background: #fff;

    padding: clamp(0.8em, 2vw, 0.8em) clamp(1em, 3vw, 2em);
    font-size: clamp(0.8em, 3vw, 1em);

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    cursor: pointer;
    img {
      width: clamp(18px, 3vw, 22px);
      height: clamp(18px, 3vw, 22px);
    }
    span {
      width: clamp(7ch, 2vw, 9ch);
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

  @media only screen and (max-width: 500px) {
    .or {
      .line {
        background: #fff;
      }
      h3 {
        color: #fff;
        font-size: 0.9em;
        font-weight: 400;
      }
    }

    .logo {
      box-shadow: none;
    }
  }
`

export default OAuth
