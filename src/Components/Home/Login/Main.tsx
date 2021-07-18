import styled from "styled-components"

import HeroText from "./Herotext"
import Right from "./Right"

const Main: React.FC = () => {
  return (
    <StyledMain>
      <div className="left">
        <HeroText />
      </div>
      <Right />
    </StyledMain>
  )
}

const StyledMain = styled.main`
  width: 100vw;
  height: calc(100vh - var(--navHeight));
  background: transparent;

  display: flex;

  z-index: 1;

  .left {
    padding: 0 var(--padding);
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
  }

  @media only screen and (max-width: 600px) {
    .left {
      display: none;
    }
  }
`

export default Main
