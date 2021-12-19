import { Global, css } from "@emotion/react"

const style = css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --fontHeading: "Oswald", sans-serif;
    --fontContent: "Lato", sans-serif;
    --fontGoogle: "Roboto", sans-serif;
    --extrLarge: 25vw;
    --large: 23vw;
    --medium: 21vw;
    --small: 19vw;
    --extrasmall: 17vw;

    --padding: clamp(1em, 5vw, 4em);
  }

  html[theme="small"] {
    --size: var(--small);
  }

  html[theme="medium"] {
    --size: var(--medium);
  }
  html[theme="large"] {
    --size: var(--large);
  }

  body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(to top, #2b5876, #4e4376);
    background-repeat: no-repeat;
    user-select: none;
  }

  button {
    border: 0;
    cursor: pointer;
    &:focus {
      outline: 0;
    }
  }

  input {
    border: 0;
    &:focus {
      outline: 0;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

const GlobalStyle = () => <Global styles={style} />

export default GlobalStyle
