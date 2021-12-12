import styled from "@emotion/styled"
import Form from "./Form"

const Left: React.FC = () => {
  return (
    <StyledLeft>
      <div className="bgWhite"></div>
      <div className="bubble one"></div>
      <div className="bubble two"></div>
      <div className="bubble three"></div>
      <div className="bubble four"></div>
      <Form />
    </StyledLeft>
  )
}

const StyledLeft = styled.div`
  width: var(--leftWidth);
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .bgWhite {
    position: absolute;
    top: -50%;
    left: 0;
    transform: translate(-50%);

    width: calc(2 * var(--leftWidth));
    height: 180%;
    border-radius: 50%;

    background: #fff;

    will-change: transform;
    animation: rotate 15s linear infinite;

    @keyframes rotate {
      0% {
        transform: translate(-50%) rotateY(0);
      }
      100% {
        transform: translate(-50%) rotateZ(180deg);
      }
    }
  }
  bubble {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    .bgWhite {
      animation: none;
      top: 0;
      left: 0;
      width: 100vh;
      height: 100vh;
      border-radius: 50%;
      transform: translate(-45%, -20%);
    }
    .bubble {
      display: block;
      position: absolute;
      background: #fff;
      border-radius: 50%;
    }
    .one {
      bottom: 2em;
      right: 2em;
      height: 1em;
      width: 1em;
    }
    .two {
      bottom: 4em;
      right: 5em;
      height: 1.5em;
      width: 1.5em;
    }
    .three {
      bottom: 7em;
      right: 2em;
      height: 2.5em;
      width: 2.5em;
    }
    .four {
      bottom: 8em;
      right: 7em;
      height: 3em;
      width: 3em;
    }
  }
`

export default Left
