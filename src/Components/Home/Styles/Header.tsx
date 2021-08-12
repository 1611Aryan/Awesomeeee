import { Link } from "react-router-dom"
import styled from "styled-components"

const Header: React.FC<{ useCase: "login" | "signup" }> = ({ useCase }) => {
  const theme = {
    headingColor: useCase === "login" ? "#fff" : "var(--primary)",
    buttonBg: useCase === "login" ? "var(--primary)" : "#fff",
    buttonColor: useCase === "login" ? "#fff" : "var(--primary)",
  }

  return (
    <StyledHeader theme={theme}>
      <h1>
        <Link to="/">Messenger</Link>
      </h1>

      {useCase === "login" ? (
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      ) : (
        <Link to="/">
          <button>Login</button>
        </Link>
      )}
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  --headerFontSize: 2.5em;

  width: 100vw;
  height: var(--navHeight);
  padding: 0 var(--padding);

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: var(--fontHeading);

  position: relative;
  z-index: 10;
  h1 {
    font-size: clamp(
      calc(var(--headerFontSize) - 0.75em),
      4vw,
      var(--headerFontSize)
    );
    font-weight: 700;
    color: ${props => props.theme.headingColor};
  }

  button {
    padding: 0.42rem 1.1rem;
    background: ${props => props.theme.buttonBg};

    font-size: clamp(
      calc((var(--headerFontSize) - 0.75em) / 2),
      4vw,
      calc(var(--headerFontSize) / 2)
    );
    font-weight: 700;
    color: ${props => props.theme.buttonColor};

    border-radius: 6px;
  }

  @media only screen and (max-width: 600px) {
    button {
      color: ${props => props.theme.buttonBg};
      background: ${props => props.theme.buttonColor};
      border-radius: 3px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }
  }
`

export default Header
