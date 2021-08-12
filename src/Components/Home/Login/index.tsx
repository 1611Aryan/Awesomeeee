import { motion } from "framer-motion"
import styled from "styled-components"

import HeroText from "./Herotext"
import FormContainer from "./FormContainer"
import Header from "../Styles/Header"
import LoginPullTab from "./LoginPullTab"

const Login: React.FC = () => {
  const variants = {
    initial: {
      x: -1200,
    },
    animate: {
      x: 0,
    },
  }

  return window.innerWidth >= 500 ? (
    <StyledLogin variants={variants} initial="initial" animate="animate">
      <Header useCase="login" />
      <StyledMain>
        <HeroText />
        <FormContainer />
      </StyledMain>
    </StyledLogin>
  ) : (
    <StyledLogin variants={variants} initial="initial" animate="animate">
      <Header useCase="login" />
      <StyledMain>
        <HeroText />
        <LoginPullTab />
      </StyledMain>
    </StyledLogin>
  )
}

const StyledLogin = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to top, #2b5876, #4e4376);

  --padding: clamp(1em, 5vw, 4em);
  --navHeight: 10vh;
  --primary: #4d4476;
`

const StyledMain = styled.main`
  width: 100vw;
  height: calc(100vh - var(--navHeight));
  background: transparent;

  display: flex;

  z-index: 1;

  .visibleLogin {
    transform: translate(-83.275%);
  }
`

export default Login
