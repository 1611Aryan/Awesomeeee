import styled from "styled-components";
import Header from "./Header";
import Main from "./Main";

const SignUp: React.FC = () => {
  return (
    <StyledSignUp>
      <Header />
      <Main />
    </StyledSignUp>
  );
};

const StyledSignUp = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to top, #2b5876, #4e4376);

  --padding: clamp(2rem, 5vw, 4rem);
  --navHeight: 10vh;
  --primary: #4d4476;

  --leftWidth: 60vw;
  --rightWidth: calc(100vw - var(--leftWidth));
`;

export default SignUp;
