import styled from "styled-components"

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
    height: calc(0.6 * var(--chatWidth));

    background: radial-gradient(
      rgba(16, 16, 16, 0.5),
      rgba(36, 4, 56, 0.5),
      rgba(255, 226, 89, 0.5),
      rgba(255, 167, 81, 0.5)
    );
    background-size: 400% 400%;

    animation: AnimationName 20s ease-in-out infinite;

    border-radius: 50%;
  }

  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: clamp(40%, 28ch, 90%);

    font-family: var(--fontHeading);
    font-size: 4em;
    color: #fff;

    text-align: center;
  }
`

export default ClosedChat
