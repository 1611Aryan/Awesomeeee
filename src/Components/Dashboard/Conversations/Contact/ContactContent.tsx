import styled from "styled-components"
import { contactI } from "Actions/contactsAction"

const ContactContent: React.FC<{ contact: contactI }> = ({ contact }) => {
  return (
    <StyledContent>
      <h3>{contact.name}</h3>
      {contact.lastMessage ? (
        <p>{contact.lastMessage}</p>
      ) : (
        <p className="overEnthusiasm">Tap to start the conversation!</p>
      )}
    </StyledContent>
  )
}

const StyledContent = styled.div`
  width: 50%;
  height: var(--contactImageSize);

  flex: 1;
  color: white;

  font-family: var(--fontContent);

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  overflow: hidden;

  margin-left: 1em;
  h3 {
    width: 100%;
    font-weight: 400;
    font-size: var(--contactNameSize);
    color: #fffd;
    word-break: break-word;
  }
  p {
    width: 100%;

    margin-top: calc(var(--contactTextSize) / 2.5);
    font-weight: 400;
    font-size: var(--contactTextSize);
    line-height: 1.1;
    color: rgba(211, 211, 211, 0.8);
    word-break: break-word;
    overflow: hidden;
  }
  .overEnthusiasm {
    color: rgba(196, 196, 196, 0.8);
    font-size: calc(var(--contactTextSize) * 0.95);
  }
`

export default ContactContent
