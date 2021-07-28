import { motion } from "framer-motion"
import styled from "styled-components"
import Header from "./Header"
import Main from "./Main"

const Login: React.FC = () => {
  const variants = {
    initial: {
      x: -1200,
    },
    animate: {
      x: 0,
    },
  }

  return (
    <StyledLogin variants={variants} initial="initial" animate="animate">
      <Header />
      <Main />
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

export default Login
