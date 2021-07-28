import styled from "styled-components"
import { StyledButton } from "../Styles"

const DeleteField = () => {
  return (
    <StyledPasswordField>
      <div className="label">GoodBye: </div>
      <div className="info">This Action is Irreversible</div>
      <StyledButton type="button">Delete My Account</StyledButton>
    </StyledPasswordField>
  )
}

const StyledPasswordField = styled.div`
  button {
    margin: 1em 0;

    background: linear-gradient(to right, #ce4351, #f56b61);
  }
`

export default DeleteField
