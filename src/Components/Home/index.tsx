import styled from "styled-components";
import Header from "./Header";
import Main from "./Main";

const Home: React.FC = () => {
  return (
    <StyledHome>
      <Header />
      <Main />
    </StyledHome>
  );
};

const StyledHome = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to top, #2b5876, #4e4376);

  --padding: clamp(2rem, 5vw, 4rem);
  --navHeight: 10vh;
  --primary: #4d4476;
`;

export default Home;
