import styled from "styled-components"
import { FiChevronLeft } from "react-icons/fi"
import { useState } from "react"

const LoginPullTab = () => {
  const [displayLogin, setDisplayLogin] = useState(false)

  const scootOver = () => {
    setDisplayLogin(true)
  }

  return (
    <StyledPullTab className={displayLogin ? "visibleLogin" : ""}>
      <div className="tab" onClick={scootOver}>
        <FiChevronLeft />
      </div>
      <div className="login">
        <span onClick={scootOver}>Login</span>
      </div>
      <div className="formContainer">
        <form></form>
      </div>
    </StyledPullTab>
  )
}

const StyledPullTab = styled.div`
  position: fixed;
  top: 0;
  left: 80vw;
  width: 120vw;
  height: 100vh;

  background: #fff;

  display: flex;

  transition: all ease 100ms;

  .tab {
    position: absolute;
    top: 50%;
    left: -0.75em;
    transform: translateY(-50%);

    height: 2.5em;
    width: 2.5em;
    background: #fff;

    border-radius: 50%;

    display: grid;
    place-items: center;

    svg {
      color: var(--primary);
      font-size: 1.25em;
      cursor: pointer;
      transform: translateX(-0.5em);
    }
  }

  .login {
    width: 20vw;

    display: grid;
    place-items: center;
    span {
      position: relative;
      z-index: 2;

      font-size: 1.15em;
      font-weight: 500;
      color: var(--primary);

      cursor: pointer;
      font-family: var(--fontContent);
    }
  }

  .formContainer {
    width: 100vw;
    height: 100%;

    display: grid;
    place-items: center;

    form {
      width: 80%;
      height: 80%;
      background: linear-gradient(to top, #2b5876, #4e4376);
    }
  }
`

export default LoginPullTab
