import { motion } from "framer-motion"
import styled from "@emotion/styled"

import Header from "Components/Common/Header"
import HeroText from "Components/Login/Herotext"
import FormContainer from "Components/Login/FormContainer"
import LoginPullTab from "Components/Login/LoginPullTab"
import { useLoginPullTab } from "Providers/LoginPullTabProvider"

const Login: React.FC = () => {
  const { pullTabActive, setPullTabActive } = useLoginPullTab()

  const variants = {
    initial: {
      x: -1200,
    },
    animate: {
      x: 0,
    },
  }

  return (
    <StyledLogin
      variants={window.innerWidth > 500 ? variants : {}}
      initial="initial"
      animate="animate"
    >
      <Header
        setPullTabActive={setPullTabActive}
        pullTabActive={pullTabActive}
        useCase="login"
      />
      <StyledMain>
        <HeroText />
        <FormContainer />
        <LoginPullTab
          setPullTabActive={setPullTabActive}
          pullTabActive={pullTabActive}
        />
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
    transform: translate(-20vw);
  }
`

export default Login
