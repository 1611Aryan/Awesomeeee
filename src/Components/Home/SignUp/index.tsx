import styled from "styled-components"
import { motion } from "framer-motion"

import Main from "./Main"
import Header from "../Styles/Header"

const SignUp: React.FC = () => {
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
    <StyledSignUp variants={variants} initial="initial" animate="animate">
      <Header useCase="signup" />
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

  --padding: clamp(2rem, 5vw, 4rem);
  --navHeight: 10vh;
  --primary: #4d4476;

  --leftWidth: 60vw;
  --rightWidth: calc(100vw - var(--leftWidth));
`

export default SignUp
