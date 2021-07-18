import { Link } from "react-router-dom"
import styled from "styled-components"

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <h1>
        <Link to="/">Messenger</Link>
      </h1>

      <Link to="/">
        <button>Login</button>
      </Link>
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
    color: var(--primary);
  }

  button {
    padding: 0.42rem 1.1rem;
    background: #fff;

    font-size: clamp(
      calc((var(--headerFontSize) - 0.75em) / 2),
      4vw,
      calc(var(--headerFontSize) / 2)
    );
    font-weight: 700;
    color: var(--primary);

    border-radius: 6px;
  }

  @media only screen and (max-width: 600px) {
    button {
      color: #fff;
      background: var(--primary);
      border-radius: 3px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }
  }
`

export default Header
