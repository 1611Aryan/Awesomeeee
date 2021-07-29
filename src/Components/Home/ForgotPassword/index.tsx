import styled from "styled-components"
import Content from "./Content"
import Header from "./Header"

const ForgotPassword = () => {
  return (
    <StyledForgotPassword>
      <Header />
      <Content />
    </StyledForgotPassword>
  )
}

const StyledForgotPassword = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  --padding: clamp(2rem, 5vw, 4rem);
  --navHeight: 10vh;
  --primary: #4d4476;
`

export default ForgotPassword
