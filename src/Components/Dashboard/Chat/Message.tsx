import useTypedSelector from "Hooks/useTypedSelector"
import { useLayoutEffect, useMemo, useState } from "react"
import styled from "@emotion/styled"

interface theme {
  background: string
  alignSelf: string
  borderRadius: string
  left: string
  right: string
  borderWidth: string
  borderColor: string
}

const Message: React.FC<{
  message: {
    message: string
    sender: string
  }
}> = ({ message }) => {
  const [theme, setTheme] = useState<theme>()
  const { user } = useTypedSelector(state => state.user)

  const themeCriteria = useMemo(() => {
    return message.sender === "me" || message.sender === user?.username
  }, [message, user])

  const themeMe = useMemo<theme>(
    () => ({
      background: themeCriteria
        ? "linear-gradient( to right,rgba(204, 174, 26, 0.5), rgba(255, 167, 81, 0.5)),rgba(0, 0, 0,0.1)"
        : " linear-gradient(to right, rgba(16, 16, 16, 0.5), rgba(36, 4, 56, 0.5) )",

      alignSelf: themeCriteria ? "flex-end" : "flex-start",

      borderRadius: themeCriteria ? "8px 0px 8px 8px" : "0 8px 8px",

      left: themeCriteria ? "auto" : "calc(-1 * var(--triangleWidth))",

      right: themeCriteria ? "calc(-1 * var(--triangleWidth))" : "auto",

      borderWidth: themeCriteria
        ? "var(--triangleHeight) var(--triangleWidth) 0 0"
        : " 0 var(--triangleWidth) var(--triangleHeight) 0",

      borderColor: themeCriteria
        ? "rgba(255, 167, 81, 0.5) transparent transparent transparent"
        : "transparent rgba(16, 16, 16, 0.5) transparent transparent",
    }),
    [themeCriteria]
  )

  useLayoutEffect(() => {
    setTheme(themeMe)
  }, [themeMe])

  return <StyledMessage theme={theme}>{message.message.trim()}</StyledMessage>
}

const StyledMessage = styled.li<{ theme: theme | undefined }>`
  --triangleWidth: 0.3em;
  --triangleHeight: 0.5em;
  --margin: calc(var(--MessagesFontSize) * 0.45);

  position: relative;
  align-self: ${props => props.theme.alignSelf};

  min-width: 5%;
  width: auto;
  max-width: 55%;
  padding: clamp(0.5em, 2vw, 1em) clamp(0.5em, 2vw, 0.75em);

  font-family: var(--fontContent);
  font-weight: 400;
  font-size: clamp(0.7em, 1vw, 0.9em);
  line-height: 1.35;
  letter-spacing: 0.3px;
  word-spacing: 0.5px;
  word-break: break-word;
  white-space: pre-wrap;

  color: #efefef;
  background: ${props => props.theme.background};

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
`

export default Message
