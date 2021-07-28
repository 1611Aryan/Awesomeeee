import styled from "styled-components"
import passwordLogo from "Media/PNG/password.png"
import React, { useState } from "react"
import VerifyModal from "./VerifyModal"
import ChangeModal from "./ChangeModal"

const ChangePassword: React.FC<{
  setPasswordModalVis: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setPasswordModalVis }) => {
  const [success, setSuccess] = useState(false)

  return (
    <StyledChangePassword className="modal">
      <div className="content">
        {success ? (
          <ChangeModal setPasswordModalVis={setPasswordModalVis} />
        ) : (
          <VerifyModal
            setSuccess={setSuccess}
            setPasswordModalVis={setPasswordModalVis}
          />
        )}
        <div className="imgContainer">
          <img src={passwordLogo} alt="password-icon" />
        </div>
      </div>
    </StyledChangePassword>
  )
}

const StyledChangePassword = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.4);

  display: grid;
  place-items: center;

  .content {
    width: 45vw;
    height: 50vh;
    padding: 2em;

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      linear-gradient(to top, #2b5876, #4e4376);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25),
      -4px -4px 10px rgba(0, 0, 0, 0.25);

    border-radius: 25px;

    font-family: var(--fontContent);

    display: flex;
    justify-content: space-between;
    align-items: center;

    overflow: hidden;

    .imgContainer {
      height: 70%;
      max-width: 40%;
      img {
        height: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        filter: contrast(90%) drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.2));
        opacity: 0.9;
      }
    }
  }
`

export default ChangePassword
