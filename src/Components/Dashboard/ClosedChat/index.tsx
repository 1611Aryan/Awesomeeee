import styled from "@emotion/styled"

const ClosedChat: React.FC = () => {
  return (
    <StyledClosedChat>
      <div className="circle"></div>
      <p>
        Select a Contact <br /> To Continue the Conversation
      </p>
    </StyledClosedChat>
  )
}

const StyledClosedChat = styled.div`
  width: var(--chatWidth);
  height: 100%;

  background: transparent;

  position: relative;

  overflow: hidden;

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 60%;
    aspect-ratio: 1/1;

    background: radial-gradient(
      rgba(255, 226, 89, 0.5),
      rgba(255, 167, 81, 0.5)
    );

    border-radius: 50%;
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: clamp(40%, 28ch, 90%);

    font-family: var(--fontHeading);
    font-size: clamp(2em, 4vw, 4em);
    color: #fff;

    text-align: center;
  }

  @media only screen and (max-width: 500px) {
    display: none;

    width: 100%;
    height: 100%;

    pointer-events: none;

    .circle {
      width: 100%;
    }
  }
`

export default ClosedChat
