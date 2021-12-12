import styled from "@emotion/styled"
import { StyledButton } from "../Styles"

const PasswordField: React.FC<{
  setPasswordModalVis: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setPasswordModalVis }) => {
  const clickHandler = () => {
    setPasswordModalVis(true)
  }

  return (
    <StyledPasswordField>
      <div className="label">Password: </div>
      <StyledButton type="button" onClick={clickHandler}>
        Change Password
      </StyledButton>
    </StyledPasswordField>
  )
}

const StyledPasswordField = styled.div`
  button {
    margin: 1em 0;
    background: linear-gradient(90deg, #6575ff, #4c5eff);
  }
`

export default PasswordField
