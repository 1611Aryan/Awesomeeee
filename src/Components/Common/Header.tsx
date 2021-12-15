import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "@emotion/styled"

const Header: React.FC<{
  useCase: "login" | "signup"
  setPullTabActive: React.Dispatch<React.SetStateAction<boolean>>
  pullTabActive: boolean
}> = ({ useCase, setPullTabActive, pullTabActive }) => {
  const [theme, setTheme] = useState({
    headingColor: useCase === "login" ? "#fff" : "var(--primary)",
    buttonBg: useCase === "login" ? "var(--primary)" : "#fff",
    buttonColor: useCase === "login" ? "#fff" : "var(--primary)",
  })

  const navigate = useNavigate()

  const clickHandler = (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ) => {
    setPullTabActive(false)
    navigate("/")
  }

  useEffect(() => {
    if (pullTabActive || useCase !== "login")
      setTheme(theme => ({ ...theme, headingColor: "var(--primary)" }))
    else setTheme(theme => ({ ...theme, headingColor: "#fff" }))
  }, [pullTabActive, useCase])

  return (
    <StyledHeader theme={theme}>
      <h1 onClick={clickHandler}>
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

const StyledHeader = styled.header<{
  theme: {
    headingColor: string
    buttonBg: string
    buttonColor: string
  }
}>`
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
`

export default Header
