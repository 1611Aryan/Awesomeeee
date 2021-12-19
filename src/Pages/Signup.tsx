import styled from "@emotion/styled"
import Main from "Components/SignUp/Main"
import Header from "Components/Common/Header"
import { motion } from "framer-motion"

import { useLoginPullTab } from "Providers/LoginPullTabProvider"

const SignUp: React.FC = () => {
  const { pullTabActive, setPullTabActive } = useLoginPullTab()
  const variants = {
    initial: {
      x: "100%",
      y: 0,
    },
    animate: {
      x: 0,
    },
  }

  return (
    <StyledSignUp
      variants={window.innerWidth >= 500 ? variants : {}}
      initial="initial"
      animate="animate"
    >
      <Header
        pullTabActive={pullTabActive}
        setPullTabActive={setPullTabActive}
        useCase="signup"
      />
      <Main />
    </StyledSignUp>
  )
}

const StyledSignUp = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  will-change: transform;

  --navHeight: 10vh;
  --primary: #4d4476;

  --leftWidth: 60vw;
  --rightWidth: calc(100vw - var(--leftWidth));
`

export default SignUp
