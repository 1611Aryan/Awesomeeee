import { useEffect, useMemo, useState } from "react";
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

  const themeMe = useMemo<theme>(
    () => ({
      background:
        message.sender === "me"
          ? "linear-gradient( to right,rgba(255, 226, 89, 0.5), rgba(255, 167, 81, 0.5))"
          : " linear-gradient(to right, rgba(16, 16, 16, 0.5), rgba(36, 4, 56, 0.5) )",

      alignSelf: message.sender === "me" ? "flex-end" : "flex-start",

      borderRadius: message.sender === "me" ? "8px 0px 8px 8px" : "0 8px 8px",

      left:
        message.sender === "me" ? "auto" : "calc(-1 * var(--triangleWidth))",

      right:
        message.sender === "me" ? "calc(-1 * var(--triangleWidth))" : "auto",

      borderWidth:
        message.sender === "me"
          ? "var(--triangleHeight) var(--triangleWidth) 0 0"
          : " 0 var(--triangleWidth) var(--triangleHeight) 0",

      borderColor:
        message.sender === "me"
          ? "rgba(255, 167, 81, 0.5) transparent transparent transparent"
          : "transparent rgba(16, 16, 16, 0.5) transparent transparent",
    }),
    [message.sender]
  );

  useEffect(() => {
    setTheme(themeMe);
  }, [themeMe]);

  return <StyledMessage theme={theme}>{message.message.trim()}</StyledMessage>;
};

const StyledMessage = styled.li`
  --triangleWidth: 0.3em;
  --triangleHeight: 0.5em;
  --margin: calc(var(--MessagesFontSize) * 0.45);

  position: relative;
  align-self: ${props => props.theme.alignSelf};

  width: auto;
  max-width: 55%;
  padding: calc(var(--MessagesFontSize) * 0.65)
    calc(var(--MessagesFontSize) * 0.75);

  font-family: var(--fontContent);
  font-weight: 400;
  font-size: var(--MessagesFontSize);

  color: #fff;
  background: ${props => props.theme.background};
  background-size: 400% 400%;

  border-radius: ${props => props.theme.borderRadius};
  margin: var(--margin) calc(var(--margin) + var(--triangleHeight))
    calc(var(--margin) * 2);

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
