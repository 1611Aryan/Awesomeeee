import styled from "@emotion/styled"
import { StyledButton } from "../Styles"

const BIO_FIELD: React.FC = () => {
  return (
    <STYLED_BIO_FIELD>
      <label htmlFor="bio">BIO</label>
      <textarea></textarea>
      <ReStyledButton>Edit</ReStyledButton>
    </STYLED_BIO_FIELD>
  )
}

const STYLED_BIO_FIELD = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  textarea {
    margin: 1em 0;
    width: 100%;
    height: 30vh;
    padding: 0.5em;

    background: rgba(255, 255, 255, 0.2);

    border: 0;
    border-radius: 2px;
    resize: none;

    &:focus {
      border: 1px solid rgba(255, 255, 255, 0.5);
      outline: 0;
    }
  }
`

const ReStyledButton = styled(StyledButton)`
  align-self: flex-end;
  background: linear-gradient(90deg, #6575ff, #4c5eff);
`

export default BIO_FIELD
