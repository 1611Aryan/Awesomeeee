import styled from "@emotion/styled"
import Content from "Components/Password/Content"
import Header from "Components/Password/Header"

const ChangePassword = () => {
  return (
    <StyledChangePassword>
      <Header />
      <Content heading="change" />
    </StyledChangePassword>
  )
}

const StyledChangePassword = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  --navHeight: 10vh;
  --primary: #4d4476;
`

export default ChangePassword
