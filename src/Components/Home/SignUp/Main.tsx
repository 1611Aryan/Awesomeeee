import styled from "@emotion/styled"
import Left from "./Left"
import Right from "./Right"

const Main: React.FC = () => {
  return (
    <StyledMain>
      <Left />
      <Right />
    </StyledMain>
  )
}

const StyledMain = styled.main`
  width: 100vw;
  height: calc(100vh - var(--navHeight));

  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

export default Main
