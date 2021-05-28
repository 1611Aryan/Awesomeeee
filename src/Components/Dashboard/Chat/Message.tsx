import { useEffect, useState } from "react";
import styled from "styled-components";

interface theme {
  background: string;
  alignSelf: string;
  borderRadius: string;
  left: string;
  right: string;
  borderWidth: string;
  borderColor: string;
}

const Message: React.FC<{
  message: {
    message: string;
    sender: "me" | "contact";
  };
}> = ({ message }) => {
  const [theme, setTheme] = useState<theme>();

  useEffect(() => {
    message.sender === "me"
      ? setTheme({
          background:
            "linear-gradient( to right,rgba(255, 226, 89, 0.5), rgba(255, 167, 81, 0.5))",
          alignSelf: "flex-end",
          borderRadius: "8px 0px 8px 8px",
          left: "auto",
          right: "calc(-1 * var(--triangleWidth))",
          borderWidth: "var(--triangleHeight) var(--triangleWidth) 0 0",
          borderColor:
            "rgba(255, 167, 81, 0.5) transparent transparent transparent",
        })
      : setTheme({
          background:
            " linear-gradient(to right, rgba(16, 16, 16, 0.5), rgba(36, 4, 56, 0.5) )",
          alignSelf: "flex-start",
          borderRadius: "0 8px 8px",
          left: "calc(-1 * var(--triangleWidth))",
          right: "auto",
          borderWidth: " 0 var(--triangleWidth) var(--triangleHeight) 0",
          borderColor:
            "transparent rgba(16, 16, 16, 0.5) transparent transparent",
        });
  }, [message.sender]);

  return <StyledMessage theme={theme}>{message.message.trim()}</StyledMessage>;
};

const StyledMessage = styled.li`
  --triangleWidth: 0.3em;
  --triangleHeight: 0.5em;
  --margin: 0.5em;

  position: relative;
  align-self: ${props => props.theme.alignSelf};

  width: auto;
  max-width: 55%;
  padding: 1em;

  font-family: var(--fontContent);
  font-weight: 400;
  font-size: 0.9em;

  color: #fff;

  background: ${props => props.theme.background};
  background-size: 400% 400%;

  border-radius: ${props => props.theme.borderRadius};
  margin: var(--margin) calc(var(--margin) + var(--triangleHeight))
    calc(var(--margin) * 2);

  animation: gradient 20s ease-in-out infinite;

  @keyframes gradient {
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

  &:first-of-type {
    margin: calc(var(--margin) * 2) calc(var(--margin) + var(--triangleHeight));
  }

  &::before {
    content: "";

    position: absolute;
    top: 0;
    left: ${props => props.theme.left};
    right: ${props => props.theme.right};

    width: 0;
    height: 0;
    border-style: solid;
    border-width: ${props => props.theme.borderWidth};
    border-color: ${props => props.theme.borderColor};
  }
`;

export default Message;
